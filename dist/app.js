"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const db_1 = require("./lib/db");
const index_1 = require("./config/index");
const scriptRouter_1 = require("./controllers/routers/scriptRouter");
const userRouter_1 = require("./controllers/routers/userRouter");
const chapterRouter_1 = require("./controllers/routers/chapterRouter");
const paragraphRouter_1 = require("./controllers/routers/paragraphRouter");
const globalErrHandler_1 = require("../src/utils/globalErrHandler");
const socket_io_1 = require("socket.io");
const ChapterController_1 = __importDefault(require("./controllers/scriptController/ChapterController"));
dotenv_1.default.config();
const app = (0, express_1.default)();
Promise.resolve((0, db_1.dBSetup)().then(() => console.log('Database connected successfully')));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const port = index_1.config.port || 5000;
const server = http_1.default.createServer(app);
exports.io = new socket_io_1.Server(server);
exports.io.on('connection', socket => {
    console.log('Client connected');
    socket.on('message', message => {
        console.log(`Received: ${message}`);
        exports.io.emit('message', message);
    });
    socket.on('hello2', (arg, callback) => {
        console.log(arg); // "world"
        callback('got it');
    });
    socket.on('create-chapter', arg => {
        ChapterController_1.default.createNewChapter(arg.scriptId);
        // console.log("creat_chapter: ",arg)
    });
    socket.on('fetch-chapter', arg => {
        ChapterController_1.default.fetchChapterDetails(arg.chapter_id);
        // console.log("creat_chapter: ",arg)
    });
    socket.on('update-chapter', arg => {
        // console.log("update_chapter: ",arg)
        ChapterController_1.default.updateChapterDetails(arg.chapter_id, arg.newContent);
    });
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});
server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
app.use((0, morgan_1.default)('tiny'));
app.get('/api/v1', (_req, res) => {
    res.send('Welcome to Nitoons!');
});
app.use(globalErrHandler_1.globalErrorHandler);
app.use('/api/v1/users', userRouter_1.router);
app.use('/api/v1/script', scriptRouter_1.scriptRouter);
app.use('/api/v1/chapters', chapterRouter_1.router);
app.use('/api/v1/paragraphs', paragraphRouter_1.router);
//# sourceMappingURL=app.js.map