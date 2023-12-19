"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const chapterValidator_1 = require("../middlewares/validators/chapterValidator");
const ChapterController_1 = __importDefault(require("../scriptController/ChapterController"));
const jwtHandler_1 = require("../middlewares/jwtHandler");
exports.router = express_1.default.Router();
exports.router.post('/create-chapter', jwtHandler_1.authMiddleware, chapterValidator_1.addChapterValidator, ChapterController_1.default.createNewChapter);
// router.put(
//   '/update-chapter/:script_id',
//   authMiddleware,
//   updateChapterValidator,
//   ScriptChapters.updateChapterDetails,
// )
exports.router.delete('/delete-chapter/:script_id', jwtHandler_1.authMiddleware, chapterValidator_1.chapterValidator, ChapterController_1.default.deleteScriptChapter);
exports.router.get('/fetch-chapter/:script_id', jwtHandler_1.authMiddleware, chapterValidator_1.chapterValidator, ChapterController_1.default.getChapter);
exports.router.get('/all-chapters/:script_id', jwtHandler_1.authMiddleware, chapterValidator_1.allChaptersValidator, ChapterController_1.default.getAllChaptersInScript);
//# sourceMappingURL=chapterRouter.js.map