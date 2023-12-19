"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ParagraphModel_1 = __importDefault(require("../Scripts/models/ParagraphModel"));
class ParagraphNamespace {
    static async createNewParagraph(details) {
        const newParagraph = ParagraphModel_1.default.create({
            chapter_id: details.chapter_id,
        });
        return newParagraph;
    }
    static async getAllParagraphs(details) {
        const fetchedParagraphs = ParagraphModel_1.default.find({
            chapter_id: details.chapter_id,
        });
        return fetchedParagraphs;
    }
}
exports.default = ParagraphNamespace;
//# sourceMappingURL=Paragraph.js.map