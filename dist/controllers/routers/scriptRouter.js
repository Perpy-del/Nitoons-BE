"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scriptRouter = void 0;
const express_1 = __importDefault(require("express"));
const scriptValidator_1 = require("../middlewares/validators/scriptValidator");
const ScriptController_1 = __importDefault(require("../scriptController/ScriptController"));
const jwtHandler_1 = require("../middlewares/jwtHandler");
exports.scriptRouter = express_1.default.Router();
exports.scriptRouter.post('/create-script/:user_id', jwtHandler_1.authMiddleware, scriptValidator_1.validateUserId, ScriptController_1.default.createScript);
exports.scriptRouter.get('/fetch-scripts/:user_id', jwtHandler_1.authMiddleware, scriptValidator_1.validateUserId, ScriptController_1.default.getScriptsByUserId);
exports.scriptRouter.get('/fetch-script/:script_id', jwtHandler_1.authMiddleware, scriptValidator_1.validateScriptId, ScriptController_1.default.getOneScriptById);
exports.scriptRouter.put('/update-scripts/:user_id', jwtHandler_1.authMiddleware, scriptValidator_1.validateScriptData, ScriptController_1.default.updateScripts);
exports.scriptRouter.put('/update-scripts/trash/:user_id', jwtHandler_1.authMiddleware, scriptValidator_1.validateScriptIds, ScriptController_1.default.updateScriptTrash);
exports.scriptRouter.put('/update-scripts/rename/:user_id', jwtHandler_1.authMiddleware, scriptValidator_1.validateScriptTitle, ScriptController_1.default.updateScriptName);
exports.scriptRouter.put('/update-scripts/trash-one/:user_id', jwtHandler_1.authMiddleware, scriptValidator_1.validateScriptAndUserId, ScriptController_1.default.trashScript);
exports.scriptRouter.put('/update-scripts/untrash-one/:user_id', jwtHandler_1.authMiddleware, scriptValidator_1.validateScriptAndUserId, ScriptController_1.default.removeTrashScript);
exports.scriptRouter.put('/update-scripts/duplicate-script/:user_id', jwtHandler_1.authMiddleware, scriptValidator_1.validateScriptAndUserId, ScriptController_1.default.duplicateCreatedScript);
exports.scriptRouter.put('/delete-scripts/delete-one/:user_id', scriptValidator_1.validateScriptAndUserId, ScriptController_1.default.deleteScript);
// scriptRouter.delete('/delete-scripts/:user_id', validateScriptId, deleteScriptsById);
//# sourceMappingURL=scriptRouter.js.map