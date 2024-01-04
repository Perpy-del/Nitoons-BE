"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ScriptModel_1 = __importDefault(require("../Scripts/models/ScriptModel"));
class ScriptNamespace {
    static async createNewScript(scriptDetails) {
        const newScript = new ScriptModel_1.default({
            user_id: scriptDetails.user_id,
        });
        const savedScript = newScript.save();
        return savedScript;
    }
    static async getScripts(scriptDetails) {
        const userScripts = ScriptModel_1.default.find({
            user_id: scriptDetails.user_id,
        });
        return userScripts;
    }
    static async getOneScript(scriptDetails) {
        const userScript = ScriptModel_1.default.findOne({
            _id: scriptDetails.script_id,
        });
        return userScript;
    }
    static async trashScripts(scriptDetails) {
        const trashScripts = ScriptModel_1.default.updateMany({
            user_id: scriptDetails.user_id,
            _id: { $in: scriptDetails.scriptIds },
        }, {
            $set: { isTrashed: true },
        });
        return trashScripts;
    }
    static async updateScriptTitle(scriptDetails) {
        const titleScripts = ScriptModel_1.default.findOneAndUpdate({
            user_id: scriptDetails.user_id,
            _id: scriptDetails.script_id,
        }, {
            title: scriptDetails.title,
        }, { new: true });
        return titleScripts;
    }
    static async updatetrashScript(scriptDetails) {
        const trashedScript = ScriptModel_1.default.findOneAndUpdate({
            user_id: scriptDetails.user_id,
            _id: scriptDetails.script_id,
        }, {
            isTrashed: true,
        }, { new: true });
        return trashedScript;
    }
    static async updatetrashScriptFalse(scriptDetails) {
        const trashedScript = ScriptModel_1.default.findOneAndUpdate({
            user_id: scriptDetails.user_id,
            _id: scriptDetails.script_id,
        }, {
            isTrashed: false,
        }, { new: true });
        return trashedScript;
    }
    static async deleteSingleScript(scriptDetails) {
        const deletedScript = ScriptModel_1.default.findOneAndUpdate({
            user_id: scriptDetails.user_id,
            _id: scriptDetails.script_id,
        }, {
            isDeleted: true,
        }, { new: true });
        return deletedScript;
    }
    static async duplicateScript(scriptDetails) {
        try {
            // Step 1: Find the original script
            const originalScript = await ScriptModel_1.default.findOne({
                user_id: scriptDetails.user_id,
                _id: scriptDetails.script_id,
            });
            // Step 2: Duplicate the script content
            const duplicatedScriptContent = { ...originalScript?.toObject() };
            delete duplicatedScriptContent._id; // Remove the original script ID to generate a new one
            // Step 3: Create a new script with duplicated content
            const duplicatedScript = await ScriptModel_1.default.create({
                user_id: scriptDetails.user_id,
                ...duplicatedScriptContent,
            });
            return duplicatedScript;
        }
        catch (error) {
            // Handle any errors that might occur during the process
            console.error('Error duplicating script:', error);
            throw new Error('Failed to duplicate script');
        }
    }
    static async updateAllScripts(scriptDetails) {
        const updatedScripts = await Promise.all(scriptDetails.scripts.map(async (script) => {
            const { _id, ...scriptUpdates } = script;
            const updatedScript = await ScriptModel_1.default.findOneAndUpdate({
                user_id: scriptDetails.user_id,
                _id: script._id,
            }, scriptUpdates, { new: true });
            return updatedScript;
        }));
        return updatedScripts;
    }
}
exports.default = ScriptNamespace;
//# sourceMappingURL=Script.js.map