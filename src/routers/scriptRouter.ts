import express from "express";
import { validateUserId, validateScriptId, validateScriptData } from "../controllers/middlewares/validators/scriptValidator";
import { createScript,getScriptsByUserId, deleteScriptsById, updateScripts, updateScriptTrash, updateScriptName, trashScript, deleteScript, removeTrashScript, duplicateCreatedScript} from "../controllers/scriptController/scriptController";

export const scriptRouter = express.Router();
scriptRouter.post('/create-script/:user_id', validateUserId, createScript);
scriptRouter.get('/fetch-scripts/:user_id', validateUserId, getScriptsByUserId);
scriptRouter.delete('/delete-scripts/:user_id', validateScriptId, deleteScriptsById);
scriptRouter.put('/update-scripts/:user_id',   updateScripts);
scriptRouter.put('/update-scripts/trash/:user_id',  validateScriptId, updateScriptTrash);
scriptRouter.put('/update-scripts/rename/:user_id',  updateScriptName);
scriptRouter.put('/update-scripts/trash-one/:user_id',  trashScript);
scriptRouter.put('/update-scripts/untrash-one/:user_id',  removeTrashScript);
scriptRouter.put('/update-scripts/duplicate-script/:user_id',  duplicateCreatedScript);
scriptRouter.put('/delete-scripts/delete-one/:user_id',  deleteScript);
