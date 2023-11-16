import { Request, Response } from 'express'
import { Types } from 'mongoose'
import ResponseNamespace from '../../utils/responses_namespace'
import ScriptModel, { IScript } from './models/ScriptModel'
// import { createNewScript, getScripts, deleteScripts, updateAllScripts, trashScripts, updateScriptTitle, updatetrashScript,deleteSingleScript,  updatetrashScriptFalse, duplicateScript } from '../../lib/Scripts/script_namespace';

// import { Types } from 'mongoose';

// export const createNewScript = async (props: { user_id: Types.ObjectId }) => {
//   const newScript = new ScriptModel({
//     user_id: props.user_id,
//   });
//   const savedScript = newScript.save();
//   return savedScript;
// };

export default class ScriptController {
  public static async createScript(req: Request, res: Response) {
    const { user_id } = req.params
    try {
      // // Convert the string user_id to a Types.ObjectId
      // const userId = new Types.ObjectId(user_id);

      const newScript: IScript = await ScriptModel.create({ user_id })

      console.log('New Script: ', newScript)

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
    // export const getScriptsByUserId = async (req: Request, res: Response) => {
    const { user_id } = req.params
    try {
      //   // Convert the string user_id to a Types.ObjectId
      //   const userId = new Types.ObjectId(user_id);

      // export const getScripts = async (props: { user_id: Types.ObjectId }) => {
      //   const userScripts = ScriptModel.find({
      //     user_id: props.user_id,
      //   });
      //   return userScripts;
      // };

      const getScript = await ScriptModel.find({ user_id })
      console.log('scripts: ', getScript)

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
    // export const deleteScriptsById = async (req: Request, res: Response) => {

    // export const deleteScripts = async (props: {
    //   user_id: Types.ObjectId;
    //   scriptIds: string[];
    // }) => {
    //   const deletedScripts = ScriptModel.deleteMany({
    //     user_id: props.user_id,
    //     _id: { $in: props.scriptIds },
    //   });
    //   return deletedScripts;
    // };
    const { user_id } = req.params
    const { scriptIds } = req.body
    try {
      // Convert the string user_id to a Types.ObjectId
      //   const userId = new Types.ObjectId(user_id);

      const deleteScript = await ScriptModel.deleteMany({
        user_id,
        _id: { $in: scriptIds },
      })

      console.log('delete: ', deleteScript)
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
    // export const updateScriptTrash = async (req: Request, res: Response) => {

    // export const trashScripts = async (props: {
    //   user_id: Types.ObjectId;
    //   scriptIds: string[];
    // }) => {
    //   const trashScripts = ScriptModel.updateMany(
    //     {
    //       user_id: props.user_id,
    //       _id: { $in: props.scriptIds },
    //     },
    //     {
    //       $set: { isTrashed: true },
    //     }
    //   );
    //   return trashScripts;
    // };

    const { user_id } = req.params
    const { scriptIds } = req.body
    try {
      // Convert the string user_id to a Types.ObjectId
      //   const userId = new Types.ObjectId(user_id);

      const trashScript = await ScriptModel.updateMany(
        {
          user_id,
          _id: { $in: scriptIds },
        },
        { isTrashed: true },
        { new: true },
      )

      console.log('trashed: ', trashScript)
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
    // export const updateScriptName = async (req: Request, res: Response) => {
    const { user_id } = req.params
    const { script_id, title } = req.body
    try {
      // Convert the string user_id to a Types.ObjectId
      //   const userId = new Types.ObjectId(user_id);

      // export const updateScriptTitle = async (props: {
      //   user_id: Types.ObjectId;
      //   script_id: Types.ObjectId;
      //   title: string;
      // }) => {
      //   const titleScripts = ScriptModel.findOneAndUpdate(
      //     {
      //       user_id: props.user_id,
      //       _id: props.script_id,
      //     },
      //     {
      //       title: props.title,
      //     },
      //     { new: true }
      //   );
      //   return titleScripts;
      // };

      const titleScript = await ScriptModel.findOneAndUpdate({
        user_id,
        _id: script_id,
        title,
      })

      // console.log("update script by title: ", titleScript);
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
    // export const trashScript = async (req: Request, res: Response) => {
    const { user_id } = req.params
    const { script_id } = req.body
    try {
      // Convert the string user_id to a Types.ObjectId
      //   const userId = new Types.ObjectId(user_id);

      // export const updatetrashScript = async (props: {
      //   user_id: Types.ObjectId;
      //   script_id: Types.ObjectId;
      // }) => {
      //   const trashedScript = ScriptModel.findOneAndUpdate(
      //     {
      //       user_id: props.user_id,
      //       _id: props.script_id,
      //     },
      //     {
      //       isTrashed: true,
      //     },
      //     { new: true }
      //   );
      //   return trashedScript;
      // };
      const titleScript = await ScriptModel.findOneAndUpdate(
        {
          user_id,
          _id: script_id,
        },
        { isTrashed: true },
        { new: true },
      )

      // console.log("delete: ", deleteScript)
      return ResponseNamespace.sendSuccessMessage(
        res,
        titleScript,
        res.status(200).statusCode,
        'Script dleted successfully',
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
    // export const removeTrashScript = async (req: Request, res: Response) => {
    const { user_id } = req.params
    const { script_id } = req.body
    try {
      // Convert the string user_id to a Types.ObjectId
      //   const userId = new Types.ObjectId(user_id);

      // export const updatetrashScriptFalse = async (props: {
      //   user_id: Types.ObjectId;
      //   script_id: Types.ObjectId;
      // }) => {
      //   const trashedScript = ScriptModel.findOneAndUpdate(
      //     {
      //       user_id: props.user_id,
      //       _id: props.script_id,
      //     },
      //     {
      //       isTrashed: false,
      //     },
      //     { new: true }
      //   );
      //   return trashedScript;
      // };

      const titleScript = await ScriptModel.findOneAndUpdate(
        {
          user_id,
          _id: script_id,
        },
        { isTrashed: false },
        { new: true },
      )

      // console.log("title: ", titleScript)
      return ResponseNamespace.sendSuccessMessage(
        res,
        titleScript,
        res.status(200).statusCode,
        'Script dleted successfully',
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

  public static async duplicateCreatedScript(req: Request, res: Response) {
    // export const duplicateCreatedScript = async (req: Request, res: Response) => {
    const { user_id } = req.params
    const { script_id } = req.body
    try {
      // Convert the string user_id to a Types.ObjectId
      //   const userId = new Types.ObjectId(user_id);

      // export const duplicateScript = async (props: {
      //   user_id: Types.ObjectId;
      //   script_id: Types.ObjectId;
      // }) => {
      //   try {
      //     // Step 1: Find the original script
      //     const originalScript = await ScriptModel.findOne({
      //       user_id: props.user_id,
      //       _id: props.script_id,
      //     });

      //     // Step 2: Duplicate the script content
      //     const duplicatedScriptContent = { ...originalScript.toObject() };
      //     delete duplicatedScriptContent._id; // Remove the original script ID to generate a new one

      //     // Step 3: Create a new script with duplicated content
      //     const duplicatedScript = await ScriptModel.create({
      //       user_id: props.user_id,
      //       ...duplicatedScriptContent,
      //     });

      //     return duplicatedScript;
      //   } catch (error) {
      //     // Handle any errors that might occur during the process
      //     console.error('Error duplicating script:', error);
      //     throw new Error('Failed to duplicate script');
      //   }
      // };

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

      // console.log("delete: ", deleteScript)
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
    // export const deleteScript = async (req: Request, res: Response) => {
    const { user_id } = req.params
    const { script_id } = req.body
    try {
      // Convert the string user_id to a Types.ObjectId
      //   const userId = new Types.ObjectId(user_id);

      // export const deleteSingleScript = async (props: {
      //   user_id: Types.ObjectId;
      //   script_id: Types.ObjectId;
      // }) => {
      //   const deletedScript = ScriptModel.findOneAndUpdate(
      //     {
      //       user_id: props.user_id,
      //       _id: props.script_id,
      //     },
      //     {
      //       isDeleted: true,
      //     },
      //     { new: true }
      //   );
      //   return deletedScript;
      // };

      const deleteScript = await ScriptModel.findOneAndUpdate(
        {
          user_id,
          _id: script_id,
        },
        { isDeleted: true },
        { new: true },
      )

      console.log('deleted script: ', deleteScript)
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
    // export const updateScripts = async (req: Request, res: Response) => {
    const { user_id } = req.params
    const { scripts } = req.body

    try {
      // Convert the string user_id to a Types.ObjectId
      //   const userId = new Types.ObjectId(user_id);

      // Iterate through the received scripts and update them
      // export const updateAllScripts = async (props: {
      //   user_id: Types.ObjectId;
      //   scripts: Array<{
      //     _id: Types.ObjectId;
      //     title: string;
      //     isStarred: boolean;
      //     isTrashed: boolean;
      //     user_id: Types.ObjectId;
      //     created_at: Date;
      //     updated_at: Date;
      //     __v: number;
      //   }>;
      // }) => {
      //   const updatedScripts = await Promise.all(
      //     props.scripts.map(async script => {
      //       const { _id, ...scriptUpdates } = script;
      //       const updatedScript = await ScriptModel.findOneAndUpdate(
      //         {
      //           user_id: props.user_id,
      //           _id: script._id,
      //         },
      //         scriptUpdates,
      //         { new: true }
      //       );
      //       return updatedScript;
      //     })
      //   );
      //   return updatedScripts;
      // };
      const updateScripts = await Promise.all(
        scripts.map(async (script: any) => {
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

      console.log('updatedScripts: ', updateScripts)

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
