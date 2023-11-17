import express from "express";
import { validateUserId, validateScriptIds,validateScriptId, validateScriptTitle, validateScriptData } from "../controllers/middlewares/validators/scriptValidator";
import { createScript,getScriptsByUserId,  updateScripts, updateScriptTrash, updateScriptName, trashScript, deleteScript, removeTrashScript, duplicateCreatedScript} from "../controllers/scriptController/scriptController";
import { authMiddleware } from "../controllers/middlewares/jwtHandler"

export const scriptRouter = express.Router();
scriptRouter.post('/create-script/:user_id', authMiddleware, validateUserId, createScript);
scriptRouter.get('/fetch-scripts/:user_id', authMiddleware, validateUserId, getScriptsByUserId);
scriptRouter.put('/update-scripts/:user_id', authMiddleware, validateScriptData, updateScripts);
scriptRouter.put('/update-scripts/trash/:user_id', authMiddleware, validateScriptIds, updateScriptTrash);
scriptRouter.put('/update-scripts/rename/:user_id', authMiddleware, validateScriptTitle, updateScriptName);
scriptRouter.put('/update-scripts/trash-one/:user_id', authMiddleware, validateScriptId,  trashScript);
scriptRouter.put('/update-scripts/untrash-one/:user_id', authMiddleware, validateScriptId, removeTrashScript);
scriptRouter.put('/update-scripts/duplicate-script/:user_id', authMiddleware, validateScriptId,  duplicateCreatedScript);
scriptRouter.put('/delete-scripts/delete-one/:user_id', validateScriptId, deleteScript);
// scriptRouter.delete('/delete-scripts/:user_id', validateScriptId, deleteScriptsById);
 