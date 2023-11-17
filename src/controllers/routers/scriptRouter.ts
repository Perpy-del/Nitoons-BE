import express from 'express'
import {
  validateUserId,
  validateScriptId,
} from '../middlewares/validators/scriptValidator'
import ScriptController from '../../lib/Scripts/ScriptController'
import { authMiddleware } from '../middlewares/jwtHandler'

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
scriptRouter.delete(
  '/delete-scripts/:user_id',
  validateScriptId,
  ScriptController.deleteScriptsById,
)
scriptRouter.put(
  '/update-scripts/:user_id',
  authMiddleware,
  ScriptController.updateScripts,
)
scriptRouter.put(
  '/update-scripts/trash/:user_id',
  authMiddleware,
  validateScriptId,
  ScriptController.updateScriptTrash,
)
scriptRouter.put(
  '/update-scripts/rename/:user_id',
  authMiddleware,
  ScriptController.updateScriptName,
)
scriptRouter.put(
  '/update-scripts/trash-one/:user_id',
  authMiddleware,
  ScriptController.trashScript,
)
scriptRouter.put(
  '/update-scripts/untrash-one/:user_id',
  authMiddleware,
  ScriptController.removeTrashScript,
)
scriptRouter.put(
  '/update-scripts/duplicate-script/:user_id',
  ScriptController.duplicateCreatedScript,
)
scriptRouter.delete(
  '/delete-scripts/delete-one/:user_id',
  authMiddleware,
  ScriptController.deleteScript,
)
