import { Request, Response } from 'express'; 
import {  Types } from "mongoose";
import ResponseNamespace from '../../utils/responses_namespace';
import { createNewScript, getScripts, deleteScripts, updateAllScripts } from '../../lib/Script/script_namespace';

export const createScript = async (req: Request, res: Response) => {
        const { user_id } = req.params;
    try{
        // Convert the string user_id to a Types.ObjectId
        const userId = new Types.ObjectId(user_id);

        const newScript = await createNewScript({user_id: userId})


        return ResponseNamespace.sendSuccessMessage(
            res,
            newScript,
            res.status(200).statusCode,
            'User created new script successfully'
        );
    }catch (error) {
        console.log('Error creating new script', error, error && error.message);
        return ResponseNamespace.sendErrorMessage(
          req,
          res,
          error,
          res.status(500).statusCode,
          'Error creating new script'
        );
    }
};

export const getScriptsByUserId = async (req: Request, res: Response) => {
        const { user_id } = req.params;
    try{
        // Convert the string user_id to a Types.ObjectId
        const userId = new Types.ObjectId(user_id);

        const getScript = await getScripts({user_id: userId})
        console.log("scripts: ",  getScript)

        return ResponseNamespace.sendSuccessMessage(
            res,
            getScript,
            res.status(200).statusCode,
            'Scripts retrieved successfully'
        );
    }catch (error) {
        console.log('Error retrieving scripts', error, error && error.message);
        return ResponseNamespace.sendErrorMessage(
        req,
        res,
        error,
        res.status(500).statusCode,
        'Error retrieving scripts'
        );
    }
};



export const deleteScriptsById = async (req: Request, res: Response) => {
    const { user_id } = req.params;
    const { scriptIds } = req.body; 
try{
    // Convert the string user_id to a Types.ObjectId
    const userId = new Types.ObjectId(user_id);

    const deleteScript = await deleteScripts({
        user_id: userId,
        scriptIds 
    })

    console.log("delete: ", deleteScript)
    return ResponseNamespace.sendSuccessMessage(
        res,
        deleteScript,
        res.status(200).statusCode,
        'Deleted scripts successfully'
    );
}catch (error) {
    console.log('Error deleting scripts', error, error && error.message);
    return ResponseNamespace.sendErrorMessage(
    req,
    res,
    error,
    res.status(500).statusCode,
    'Error deleting scripts'
    );
}
};



export const updateScripts = async (req: Request, res: Response) => {
    const { user_id } = req.params;
    const { scripts } = req.body;
  
    try {
      // Convert the string user_id to a Types.ObjectId
      const userId = new Types.ObjectId(user_id);
  
      // Iterate through the received scripts and update them
        const updateResults = await updateAllScripts({
            user_id: userId,
            scripts
        })

        console.log("updateResult: ", updateResults)
  
      return ResponseNamespace.sendSuccessMessage(
        res,
        updateResults,
        200,
        'Scripts updated successfully'
      );
    } catch (error) {
      console.log('Error updating scripts', error, error && error.message);
      return ResponseNamespace.sendErrorMessage(
        req,
        res,
        error,
        500,
        'Error updating scripts'
      );
    }
};
  