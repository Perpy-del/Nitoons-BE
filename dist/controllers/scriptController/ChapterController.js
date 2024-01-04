"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const responses_namespace_1 = __importDefault(require("../../utils/responses_namespace"));
const Chapter_1 = __importDefault(require("../../lib/Scripts/Chapter"));
const app_1 = require("../../app");
class ScriptChapters {
    // public static async createNewChapter(req: Request, res: Response) {
    //   const scriptId = req.body.script_id
    //   try {
    //     const newChapter = await ChapterNamespace.addChapter({ scriptId })
    //     return ResponseNamespace.sendSuccessMessage(
    //       res,
    //       newChapter,
    //       res.status(200).statusCode,
    //       'Chapter created successfully',
    //     )
    //   } catch (error) {
    //     console.log('Error creating new chapter', error, error && error.message)
    //     return ResponseNamespace.sendErrorMessage(
    //       req,
    //       res,
    //       error,
    //       res.status(500).statusCode,
    //       'Error creating new chapter',
    //     )
    //   }
    // }
    // public static async createNewChapter(req: Request, res: Response) {
    //   const scriptId = req.body.script_id
    //   try {
    //     const newChapter = await ChapterNamespace.addChapter({ scriptId })
    //     io.emit('new-chapter', { scriptId, chapter: newChapter })
    //     return ResponseNamespace.sendSuccessMessage(
    //       res,
    //       newChapter,
    //       res.status(200).statusCode,
    //       'Chapter created successfully',
    //     )
    //   } catch (error) {
    //     console.log('Error creating new chapter', error, error && error.message)
    //     return ResponseNamespace.sendErrorMessage(
    //       req,
    //       res,
    //       error,
    //       res.status(500).statusCode,
    //       'Error creating new chapter',
    //     )
    //   }
    // }
    static async createNewChapter(scriptId) {
        try {
            const newChapter = await Chapter_1.default.addChapter({ scriptId });
            app_1.io.emit('new-chapter', { chapter: newChapter });
        }
        catch (error) {
            console.log('Error creating new chapter', error, error && error.message);
        }
    }
    static async updateChapterDetails(chapter_id, newContent) {
        try {
            const updatedChapter = await Chapter_1.default.updateChapter(chapter_id, newContent);
            // io.emit('updated-chapter', {updatedChapter: updatedChapter })
        }
        catch (error) {
            console.log('Error creating new chapter', error, error && error.message);
        }
    }
    static async fetchChapterDetails(chapter_id) {
        try {
            const fetchedChapter = await Chapter_1.default.fetchChapter(chapter_id);
            app_1.io.emit('fetched-chapter', { fetchedChapter: fetchedChapter });
        }
        catch (error) {
            console.log('Error creating new chapter', error, error && error.message);
        }
    }
    // public static async updateChapterDetails(req: Request, res: Response) {
    //   const chapterId = req.body.chapter_id
    //   const updateDetails = { ...req.body }
    //   try {
    //     const updatedChapter = await ChapterNamespace.updateChapter(chapterId, {
    //       ...updateDetails,
    //     })
    //     return ResponseNamespace.sendSuccessMessage(
    //       res,
    //       updatedChapter,
    //       res.status(200).statusCode,
    //       'Chapter updated successfully',
    //     )
    //   } catch (error) {
    //     console.log(
    //       'Error updating script chapter',
    //       error,
    //       error && error.message,
    //     )
    //     return ResponseNamespace.sendErrorMessage(
    //       req,
    //       res,
    //       error,
    //       res.status(500).statusCode,
    //       'Error updating script chapter',
    //     )
    //   }
    // }
    static async deleteScriptChapter(req, res) {
        const scriptId = req.params.script_id;
        const chapterId = req.body.chapter_id;
        try {
            const deletedChapter = await Chapter_1.default.deleteChapter({
                scriptId,
                chapterId,
            });
            return responses_namespace_1.default.sendSuccessMessage(res, deletedChapter, res.status(200).statusCode, 'Chapter deleted successfully');
        }
        catch (error) {
            console.log('Error deleting script chapter', error, error && error.message);
            return responses_namespace_1.default.sendErrorMessage(req, res, error, res.status(500).statusCode, 'Error deleting script chapter');
        }
    }
    static async getChapter(req, res) {
        const scriptId = req.params.script_id;
        const chapterId = req.body.chapter_id;
        try {
            const data = await Chapter_1.default.getChapterById({
                scriptId,
                chapterId,
            });
            return responses_namespace_1.default.sendSuccessMessage(res, data, res.status(200).statusCode, 'Chapter found successfully');
        }
        catch (error) {
            console.log('Error fetching script chapter', error, error && error.message);
            return responses_namespace_1.default.sendErrorMessage(req, res, error, res.status(500).statusCode, 'Error fetching script chapter');
        }
    }
    static async getAllChaptersInScript(req, res) {
        const scriptId = req.params.script_id;
        try {
            const data = await Chapter_1.default.getAllChapters({
                scriptId,
            });
            return responses_namespace_1.default.sendSuccessMessage(res, data, res.status(200).statusCode, 'All chapters found successfully');
        }
        catch (error) {
            console.log('Error fetching all chapters in script', error, error && error.message);
            return responses_namespace_1.default.sendErrorMessage(req, res, error, res.status(500).statusCode, 'Error fetching all chapters in script');
        }
    }
}
exports.default = ScriptChapters;
//# sourceMappingURL=ChapterController.js.map