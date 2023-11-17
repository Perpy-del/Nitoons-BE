import express from 'express'
import {
  validateUserId,
  validateScriptIds,
  validateScriptId,
  validateScriptTitle,
  validateScriptData,
} from '../controllers/middlewares/validators/scriptValidator'
import ScriptController from '../controllers/scriptController/ScriptController'
import { authMiddleware } from '../controllers/middlewares/jwtHandler'

export const scriptRouter = express.Router()
scriptRouter.post(
  '/create-script/:user_id',
  authMiddleware,
  validateUserId,
  ScriptController.createScript,
)
scriptRouter.get(
  '/fetch-scripts/:user_id',
  authMiddleware,
  validateUserId,
  ScriptController.getScriptsByUserId,
)
scriptRouter.put(
  '/update-scripts/:user_id',
  authMiddleware,
  validateScriptData,
  ScriptController.updateScripts,
)
scriptRouter.put(
  '/update-scripts/trash/:user_id',
  authMiddleware,
  validateScriptIds,
  ScriptController.updateScriptTrash,
)
scriptRouter.put(
  '/update-scripts/rename/:user_id',
  authMiddleware,
  validateScriptTitle,
  ScriptController.updateScriptName,
)
scriptRouter.put(
  '/update-scripts/trash-one/:user_id',
  authMiddleware,
  validateScriptId,
  ScriptController.trashScript,
)
scriptRouter.put(
  '/update-scripts/untrash-one/:user_id',
  authMiddleware,
  validateScriptId,
  ScriptController.removeTrashScript,
)
scriptRouter.put(
  '/update-scripts/duplicate-script/:user_id',
  authMiddleware,
  validateScriptId,
  ScriptController.duplicateCreatedScript,
)
scriptRouter.put(
  '/delete-scripts/delete-one/:user_id',
  validateScriptId,
  ScriptController.deleteScript,
)
// scriptRouter.delete('/delete-scripts/:user_id', validateScriptId, deleteScriptsById);
