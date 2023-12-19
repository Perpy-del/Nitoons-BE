"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const ParagraphController_1 = __importDefault(require("../scriptController/ParagraphController"));
const jwtHandler_1 = require("../middlewares/jwtHandler");
exports.router = express_1.default.Router();
exports.router.post('/create-paragraph', jwtHandler_1.authMiddleware, ParagraphController_1.default.createParagraph);
exports.router.get('/fetch-paragraphs', jwtHandler_1.authMiddleware, ParagraphController_1.default.getAllParagraphsInChapter);
//# sourceMappingURL=paragraphRouter.js.map