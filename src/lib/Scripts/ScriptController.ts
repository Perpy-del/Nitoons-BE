import { Request, Response } from 'express'
import ResponseNamespace from '../../utils/responses_namespace'
import ScriptModel, { IScript } from './models/ScriptModel'

export default class ScriptController {
  public static async createScript(req: Request, res: Response) {
    const { user_id } = req.params
    try {
      const newScript: IScript = await ScriptModel.create({ user_id })

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
      const getScript = await ScriptModel.find({ user_id })

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

  public static async deleteScriptsById(req: Request, res: Response) {
    const { user_id } = req.params
    const { scriptIds } = req.body
    try {
      const deleteScript = await ScriptModel.updateMany(
        {
          user_id,
          _id: { $in: scriptIds },
        },
        { isDeleted: true },
        { new: true },
      )

      return ResponseNamespace.sendSuccessMessage(
        res,
        deleteScript,
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

  public static async updateScriptTrash(req: Request, res: Response) {
    const { user_id } = req.params
    const { scriptIds } = req.body
    try {
      const trashScript = await ScriptModel.updateMany(
        {
          user_id,
          _id: { $in: scriptIds },
        },
        { isTrashed: true },
        { new: true },
      )

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
      const titleScript = await ScriptModel.findOneAndUpdate(
        {
          user_id,
          _id: script_id,
        },
        { title },
        { new: true },
      )

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
      const titleScript = await ScriptModel.findOneAndUpdate(
        {
          user_id,
          _id: script_id,
        },
        { isTrashed: true },
        { new: true },
      )

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
      const titleScript = await ScriptModel.findOneAndUpdate(
        {
          user_id,
          _id: script_id,
        },
        { isTrashed: false },
        { new: true },
      )

      return ResponseNamespace.sendSuccessMessage(
        res,
        titleScript,
        res.status(200).statusCode,
        'Script moved from thrash successfully',
      )
    } catch (error) {
      console.log('Error moving script from thrash ', error, error && error.message)
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
      const originalScript = await ScriptModel.findOne({
        user_id,
        _id: script_id,
      })
      const duplicatedScriptContent = { ...originalScript.toObject() }
      delete duplicatedScriptContent._id

      const duplicatedScript = await ScriptModel.create({
        user_id,
        ...duplicatedScriptContent,
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
      const deleteScript = await ScriptModel.findOneAndUpdate(
        {
          user_id,
          _id: script_id,
        },
        { isDeleted: true },
        { new: true },
      )

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
      const updateScripts = await Promise.all(
        scripts.map(async (script: IScript) => {
          const { _id, ...scriptUpdates } = script
          const updatedScript = await ScriptModel.findOneAndUpdate(
            {
              user_id,
              _id: script._id,
            },
            scriptUpdates,
            { new: true },
          )
          return updatedScript
        }),
      )
      return ResponseNamespace.sendSuccessMessage(
        res,
        updateScripts,
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
