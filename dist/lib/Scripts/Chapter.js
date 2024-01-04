"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { StringDecoder } from 'string_decoder'
const ChapterModel_1 = __importDefault(require("../Scripts/models/ChapterModel"));
class ChapterNamespace {
    static async addChapter(chapterDetails) {
        return ChapterModel_1.default.create({
            script_id: chapterDetails.scriptId,
        });
    }
    static async fetchChapter(chapter_id) {
        return ChapterModel_1.default.findOne({
            _id: chapter_id,
        });
    }
    static async updateChapter(chapter_id, newContent) {
        try {
            const chapter = await ChapterModel_1.default.findById(chapter_id);
            if (!chapter) {
                throw new Error('Chapter not found');
            }
            chapter.content = newContent;
            const updatedChapter = await chapter.save();
            return updatedChapter;
        }
        catch (error) {
            throw new Error(`Error updating chapter content: ${error.message}`);
        }
    }
    static async deleteChapter(chapterDetails) {
        return ChapterModel_1.default.findOneAndUpdate({
            _id: chapterDetails.chapterId,
            script_id: chapterDetails.scriptId,
        }, { deleted: true }, { new: true });
    }
    static async getChapterById(chapterDetails) {
        return ChapterModel_1.default.findById({
            _id: chapterDetails.chapterId,
            script_id: chapterDetails.scriptId,
        });
    }
    static async getAllChapters(chapterDetails) {
        return ChapterModel_1.default.find({
            script_id: chapterDetails.scriptId,
            deleted: { $ne: true },
        });
    }
}
exports.default = ChapterNamespace;
//# sourceMappingURL=Chapter.js.map