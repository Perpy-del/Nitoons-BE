"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const responses_namespace_1 = __importDefault(require("../../utils/responses_namespace"));
const mongoose_1 = require("mongoose");
const Paragraph_1 = __importDefault(require("../../lib/Scripts/Paragraph"));
const app_1 = require("../../app");
class ParagraphController {
    static async createParagraph(chapter_id) {
        try {
            const newChapter = await Paragraph_1.default.createNewParagraph({ chapter_id });
            app_1.io.emit('new-chapter', { chapter: newChapter });
        }
        catch (error) {
            console.log('Error creating new chapter', error, error && error.message);
        }
    }
    static async getAllParagraphsInChapter(req, res) {
        const chapter_id = req.params.chapter_id;
        try {
            const chapterId = new mongoose_1.Types.ObjectId(chapter_id);
            const data = await Paragraph_1.default.getAllParagraphs({
                chapter_id: chapterId
            });
            return responses_namespace_1.default.sendSuccessMessage(res, data, res.status(200).statusCode, 'All chapters found successfully');
        }
        catch (error) {
            console.log('Error fetching all chapters in script', error, error && error.message);
            return responses_namespace_1.default.sendErrorMessage(req, res, error, res.status(500).statusCode, 'Error fetching all chapters in script');
        }
    }
}
exports.default = ParagraphController;
//# sourceMappingURL=ParagraphController.js.map