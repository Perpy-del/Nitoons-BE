"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const responses_namespace_1 = __importDefault(require("../../utils/responses_namespace"));
const Script_1 = __importDefault(require("../../lib/Scripts/Script"));
const mongoose_1 = require("mongoose");
class ScriptController {
    static async createScript(req, res) {
        const { user_id } = req.params;
        try {
            const userId = new mongoose_1.Types.ObjectId(user_id);
            const newScript = await Script_1.default.createNewScript({
                user_id: userId,
            });
            return responses_namespace_1.default.sendSuccessMessage(res, newScript, res.status(200).statusCode, 'User created new script successfully');
        }
        catch (error) {
            console.log('Error creating new script', error, error && error.message);
            return responses_namespace_1.default.sendErrorMessage(req, res, error, res.status(500).statusCode, 'Error creating new script');
        }
    }
    static async getScriptsByUserId(req, res) {
        const { user_id } = req.params;
        try {
            const userId = new mongoose_1.Types.ObjectId(user_id);
            const getScript = await Script_1.default.getScripts({ user_id: userId });
            return responses_namespace_1.default.sendSuccessMessage(res, getScript, res.status(200).statusCode, 'Scripts retrieved successfully');
        }
        catch (error) {
            console.log('Error retrieving scripts', error, error && error.message);
            return responses_namespace_1.default.sendErrorMessage(req, res, error, res.status(500).statusCode, 'Error retrieving scripts');
        }
    }
    static async getOneScriptById(req, res) {
        const { script_id } = req.params;
        try {
            const scriptId = new mongoose_1.Types.ObjectId(script_id);
            const getScript = await Script_1.default.getOneScript({ script_id: scriptId });
            return responses_namespace_1.default.sendSuccessMessage(res, getScript, res.status(200).statusCode, 'Scripts retrieved successfully');
        }
        catch (error) {
            console.log('Error retrieving scripts', error, error && error.message);
            return responses_namespace_1.default.sendErrorMessage(req, res, error, res.status(500).statusCode, 'Error retrieving scripts');
        }
    }
    static async updateScriptTrash(req, res) {
        const { user_id } = req.params;
        const { scriptIds } = req.body;
        try {
            const userId = new mongoose_1.Types.ObjectId(user_id);
            const trashScript = await Script_1.default.trashScripts({
                user_id: userId,
                scriptIds,
            });
            return responses_namespace_1.default.sendSuccessMessage(res, trashScript, res.status(200).statusCode, 'Deleted scripts successfully');
        }
        catch (error) {
            console.log('Error deleting scripts', error, error && error.message);
            return responses_namespace_1.default.sendErrorMessage(req, res, error, res.status(500).statusCode, 'Error deleting scripts');
        }
    }
    static async updateScriptName(req, res) {
        const { user_id } = req.params;
        const { script_id, title } = req.body;
        try {
            const userId = new mongoose_1.Types.ObjectId(user_id);
            const titleScript = await Script_1.default.updateScriptTitle({
                user_id: userId,
                script_id: script_id,
                title: title,
            });
            return responses_namespace_1.default.sendSuccessMessage(res, titleScript, res.status(200).statusCode, 'Script title updated successfully');
        }
        catch (error) {
            console.log('Error updating script title', error, error && error.message);
            return responses_namespace_1.default.sendErrorMessage(req, res, error, res.status(500).statusCode, 'Error updating script title');
        }
    }
    static async trashScript(req, res) {
        const { user_id } = req.params;
        const { script_id } = req.body;
        try {
            const userId = new mongoose_1.Types.ObjectId(user_id);
            const titleScript = await Script_1.default.updatetrashScript({
                user_id: userId,
                script_id: script_id,
            });
            return responses_namespace_1.default.sendSuccessMessage(res, titleScript, res.status(200).statusCode, 'Script deleted successfully');
        }
        catch (error) {
            console.log('Error deleting script ', error, error && error.message);
            return responses_namespace_1.default.sendErrorMessage(req, res, error, res.status(500).statusCode, 'Error deleting script title');
        }
    }
    static async removeTrashScript(req, res) {
        const { user_id } = req.params;
        const { script_id } = req.body;
        try {
            const userId = new mongoose_1.Types.ObjectId(user_id);
            const titleScript = await Script_1.default.updatetrashScriptFalse({
                user_id: userId,
                script_id: script_id,
            });
            return responses_namespace_1.default.sendSuccessMessage(res, titleScript, res.status(200).statusCode, 'Script moved from thrash successfully');
        }
        catch (error) {
            console.log('Error moving script from thrash ', error, error && error.message);
            return responses_namespace_1.default.sendErrorMessage(req, res, error, res.status(500).statusCode, 'Error moving script from thrash');
        }
    }
    static async duplicateCreatedScript(req, res) {
        const { user_id } = req.params;
        const { script_id } = req.body;
        try {
            const userId = new mongoose_1.Types.ObjectId(user_id);
            const duplicatedScript = await Script_1.default.duplicateScript({
                user_id: userId,
                script_id: script_id,
            });
            return responses_namespace_1.default.sendSuccessMessage(res, duplicatedScript, res.status(200).statusCode, 'Script duplicated successfully');
        }
        catch (error) {
            console.log('Error duplicating script ', error, error && error.message);
            return responses_namespace_1.default.sendErrorMessage(req, res, error, res.status(500).statusCode, 'Error duplicating script');
        }
    }
    static async deleteScript(req, res) {
        const { user_id } = req.params;
        const { script_id } = req.body;
        try {
            const userId = new mongoose_1.Types.ObjectId(user_id);
            const deleteScript = await Script_1.default.deleteSingleScript({
                user_id: userId,
                script_id: script_id,
            });
            return responses_namespace_1.default.sendSuccessMessage(res, deleteScript, res.status(200).statusCode, 'Script deleted successfully');
        }
        catch (error) {
            console.log('Error deleting script ', error, error && error.message);
            return responses_namespace_1.default.sendErrorMessage(req, res, error, res.status(500).statusCode, 'Error deleting script ');
        }
    }
    static async updateScripts(req, res) {
        const { user_id } = req.params;
        const { scripts } = req.body;
        try {
            const userId = new mongoose_1.Types.ObjectId(user_id);
            // Iterate through the received scripts and update them
            const updateResults = await Script_1.default.updateAllScripts({
                user_id: userId,
                scripts,
            });
            return responses_namespace_1.default.sendSuccessMessage(res, updateResults, 200, 'Scripts updated successfully');
        }
        catch (error) {
            console.log('Error updating scripts', error, error && error.message);
            return responses_namespace_1.default.sendErrorMessage(req, res, error, 500, 'Error updating scripts');
        }
    }
}
exports.default = ScriptController;
//# sourceMappingURL=ScriptController.js.map