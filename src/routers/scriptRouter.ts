import express from "express";
import { validateUserId, validateScriptId, validateScriptData } from "../controllers/middlewares/validators/scriptValidator";
import { createScript,getScriptsByUserId, deleteScriptsById, updateScripts } from "../controllers/scriptController/scriptController";

export const scriptRouter = express.Router();
scriptRouter.post('/create-script/:user_id', validateUserId, createScript);
scriptRouter.get('/fetch-scripts/:user_id', validateUserId, getScriptsByUserId);
scriptRouter.delete('/delete-scripts/:user_id', validateScriptId, deleteScriptsById);
scriptRouter.put('/update-scripts/:user_id',  validateScriptData, updateScripts);
