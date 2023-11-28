import { Request, Response } from 'express'
import ResponseNamespace from '../../utils/responses_namespace'
import ScriptNamespace from '../../lib/Scripts/Script'
import { Types } from 'mongoose'

export default class ScriptController {
  public static async createScript(req: Request, res: Response) {
    const { user_id } = req.params
    try {
      const userId = new Types.ObjectId(user_id)
      const newScript = await ScriptNamespace.createNewScript({
        user_id: userId,
      })

      return ResponseNamespace.sendSuccessMessage(
        res,
        newScript,
        res.status(200).statusCode,
        'User created new script successfully',
      )
    } catch (error) {
      console.log('Error creating new script', error, error && error.message)
      return ResponseNamespace.sendErrorMessage(
        req,
        res,
        error,
        res.status(500).statusCode,
        'Error creating new script',
      )
    }
  }

  public static async getScriptsByUserId(req: Request, res: Response) {
    const { user_id } = req.params
    try {
      const userId = new Types.ObjectId(user_id)

      const getScript = await ScriptNamespace.getScripts({ user_id: userId })

      return ResponseNamespace.sendSuccessMessage(
        res,
        getScript,
        res.status(200).statusCode,
        'Scripts retrieved successfully',
      )
    } catch (error) {
      console.log('Error retrieving scripts', error, error && error.message)
      return ResponseNamespace.sendErrorMessage(
        req,
        res,
        error,
        res.status(500).statusCode,
        'Error retrieving scripts',
      )
    }
  }

  public static async getOneScriptById(req: Request, res: Response) {
    const { script_id } = req.params;
    try {
      const scriptId = new Types.ObjectId(script_id)

      const getScript = await ScriptNamespace.getOneScript({ script_id: scriptId})

      return ResponseNamespace.sendSuccessMessage(
        res,
        getScript,
        res.status(200).statusCode,
        'Scripts retrieved successfully',
      )
    } catch (error) {
      console.log('Error retrieving scripts', error, error && error.message)
      return ResponseNamespace.sendErrorMessage(
        req,
        res,
        error,
        res.status(500).statusCode,
        'Error retrieving scripts',
      )
    }
  }

  public static async updateScriptTrash(req: Request, res: Response) {
    const { user_id } = req.params
    const { scriptIds } = req.body
    try {
      const userId = new Types.ObjectId(user_id)

      const trashScript = await ScriptNamespace.trashScripts({
        user_id: userId,
        scriptIds,
      })

      return ResponseNamespace.sendSuccessMessage(
        res,
        trashScript,
        res.status(200).statusCode,
        'Deleted scripts successfully',
      )
    } catch (error) {
      console.log('Error deleting scripts', error, error && error.message)
      return ResponseNamespace.sendErrorMessage(
        req,
        res,
        error,
        res.status(500).statusCode,
        'Error deleting scripts',
      )
    }
  }

  public static async updateScriptName(req: Request, res: Response) {
    const { user_id } = req.params
    const { script_id, title } = req.body
    try {
      const userId = new Types.ObjectId(user_id)

      const titleScript = await ScriptNamespace.updateScriptTitle({
        user_id: userId,
        script_id: script_id,
        title: title,
      })

      return ResponseNamespace.sendSuccessMessage(
        res,
        titleScript,
        res.status(200).statusCode,
        'Script title updated successfully',
      )
    } catch (error) {
      console.log('Error updating script title', error, error && error.message)
      return ResponseNamespace.sendErrorMessage(
        req,
        res,
        error,
        res.status(500).statusCode,
        'Error updating script title',
      )
    }
  }

  public static async trashScript(req: Request, res: Response) {
    const { user_id } = req.params
    const { script_id } = req.body
    try {
      const userId = new Types.ObjectId(user_id)

      const titleScript = await ScriptNamespace.updatetrashScript({
        user_id: userId,
        script_id: script_id,
      })

      return ResponseNamespace.sendSuccessMessage(
        res,
        titleScript,
        res.status(200).statusCode,
        'Script deleted successfully',
      )
    } catch (error) {
      console.log('Error deleting script ', error, error && error.message)
      return ResponseNamespace.sendErrorMessage(
        req,
        res,
        error,
        res.status(500).statusCode,
        'Error deleting script title',
      )
    }
  }

  public static async removeTrashScript(req: Request, res: Response) {
    const { user_id } = req.params
    const { script_id } = req.body
    try {
      const userId = new Types.ObjectId(user_id)

      const titleScript = await ScriptNamespace.updatetrashScriptFalse({
        user_id: userId,
        script_id: script_id,
      })

      return ResponseNamespace.sendSuccessMessage(
        res,
        titleScript,
        res.status(200).statusCode,
        'Script moved from thrash successfully',
      )
    } catch (error) {
      console.log(
        'Error moving script from thrash ',
        error,
        error && error.message,
      )
      return ResponseNamespace.sendErrorMessage(
        req,
        res,
        error,
        res.status(500).statusCode,
        'Error moving script from thrash',
      )
    }
  }

  public static async duplicateCreatedScript(req: Request, res: Response) {
    const { user_id } = req.params
    const { script_id } = req.body
    try {
      const userId = new Types.ObjectId(user_id)

      const duplicatedScript = await ScriptNamespace.duplicateScript({
        user_id: userId,
        script_id: script_id,
      })
      return ResponseNamespace.sendSuccessMessage(
        res,
        duplicatedScript,
        res.status(200).statusCode,
        'Script duplicated successfully',
      )
    } catch (error) {
      console.log('Error duplicating script ', error, error && error.message)
      return ResponseNamespace.sendErrorMessage(
        req,
        res,
        error,
        res.status(500).statusCode,
        'Error duplicating script',
      )
    }
  }

  public static async deleteScript(req: Request, res: Response) {
    const { user_id } = req.params
    const { script_id } = req.body
    try {
      const userId = new Types.ObjectId(user_id)

      const deleteScript = await ScriptNamespace.deleteSingleScript({
        user_id: userId,
        script_id: script_id,
      })

      return ResponseNamespace.sendSuccessMessage(
        res,
        deleteScript,
        res.status(200).statusCode,
        'Script deleted successfully',
      )
    } catch (error) {
      console.log('Error deleting script ', error, error && error.message)
      return ResponseNamespace.sendErrorMessage(
        req,
        res,
        error,
        res.status(500).statusCode,
        'Error deleting script ',
      )
    }
  }

  public static async updateScripts(req: Request, res: Response) {
    const { user_id } = req.params
    const { scripts } = req.body

    try {
      const userId = new Types.ObjectId(user_id)

      // Iterate through the received scripts and update them
      const updateResults = await ScriptNamespace.updateAllScripts({
        user_id: userId,
        scripts,
      })
      return ResponseNamespace.sendSuccessMessage(
        res,
        updateResults,
        200,
        'Scripts updated successfully',
      )
    } catch (error) {
      console.log('Error updating scripts', error, error && error.message)
      return ResponseNamespace.sendErrorMessage(
        req,
        res,
        error,
        500,
        'Error updating scripts',
      )
    }
  }
}
