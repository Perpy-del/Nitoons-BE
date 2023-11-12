import { Request, Response } from 'express'; 
import {  Types } from "mongoose";
import ResponseNamespace from '../../utils/responses_namespace';
import { createNewScript, getScripts,  updateAllScripts, trashScripts, updateScriptTitle, updatetrashScript,deleteSingleScript,  updatetrashScriptFalse, duplicateScript } from '../../lib/Script/script_namespace';

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
        // console.log("scripts: ",  getScript)

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


export const updateScriptTrash = async (req: Request, res: Response) => {
    const { user_id } = req.params;
    const { scriptIds } = req.body; 
    try{
        // Convert the string user_id to a Types.ObjectId
        const userId = new Types.ObjectId(user_id);
        
        const trashScript = await trashScripts({
            user_id: userId,
            scriptIds 
        })
        
        // console.log("delete: ", deleteScript)
        return ResponseNamespace.sendSuccessMessage(
            res,
        trashScript,
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

export const updateScriptName = async (req: Request, res: Response) => {
    const { user_id } = req.params;
    const { script_id, title } = req.body; 
try{
    // Convert the string user_id to a Types.ObjectId
    const userId = new Types.ObjectId(user_id);

    const titleScript = await updateScriptTitle({
        user_id: userId,
        script_id: script_id,
        title: title
    })

    // console.log("delete: ", deleteScript)
    return ResponseNamespace.sendSuccessMessage(
        res,
        titleScript,
        res.status(200).statusCode,
        'Script title updated successfully'
    );
}catch (error) {
    console.log('Error updating script title', error, error && error.message);
    return ResponseNamespace.sendErrorMessage(
    req,
    res,
    error,
    res.status(500).statusCode,
    'Error updating script title'
    );
}
};

export const trashScript = async (req: Request, res: Response) => {
    const { user_id } = req.params;
    const { script_id } = req.body; 
try{
    // Convert the string user_id to a Types.ObjectId
    const userId = new Types.ObjectId(user_id);

    const titleScript = await updatetrashScript({
        user_id: userId,
        script_id: script_id,
    })

    // console.log("delete: ", deleteScript)
    return ResponseNamespace.sendSuccessMessage(
        res,
        titleScript,
        res.status(200).statusCode,
        'Script dleted successfully'
    );
}catch (error) {
    console.log('Error deleting script ', error, error && error.message);
    return ResponseNamespace.sendErrorMessage(
    req,
    res,
    error,
    res.status(500).statusCode,
    'Error deleting script title'
    );
}
};

export const removeTrashScript = async (req: Request, res: Response) => {
    const { user_id } = req.params;
    const { script_id } = req.body; 
try{
    // Convert the string user_id to a Types.ObjectId
    const userId = new Types.ObjectId(user_id);

    const titleScript = await updatetrashScriptFalse({
        user_id: userId,
        script_id: script_id,
    })

    // console.log("delete: ", deleteScript)
    return ResponseNamespace.sendSuccessMessage(
        res,
        titleScript,
        res.status(200).statusCode,
        'Script dleted successfully'
    );
}catch (error) {
    console.log('Error deleting script ', error, error && error.message);
    return ResponseNamespace.sendErrorMessage(
    req,
    res,
    error,
    res.status(500).statusCode,
    'Error deleting script title'
    );
}
};

export const duplicateCreatedScript = async (req: Request, res: Response) => {
    const { user_id } = req.params;
    const { script_id } = req.body; 
try{
    // Convert the string user_id to a Types.ObjectId
    const userId = new Types.ObjectId(user_id);

    const duplicatedScript = await duplicateScript({
        user_id: userId,
        script_id: script_id,
    })

    // console.log("delete: ", deleteScript)
    return ResponseNamespace.sendSuccessMessage(
        res,
        duplicatedScript,
        res.status(200).statusCode,
        'Script duplicated successfully'
    );
}catch (error) {
    console.log('Error duplicating script ', error, error && error.message);
    return ResponseNamespace.sendErrorMessage(
    req,
    res,
    error,
    res.status(500).statusCode,
    'Error duplicating script'
    );
}
};


export const deleteScript = async (req: Request, res: Response) => {
    const { user_id } = req.params;
    const { script_id } = req.body; 
try{
    // Convert the string user_id to a Types.ObjectId
    const userId = new Types.ObjectId(user_id);

    const deleteScript = await deleteSingleScript({
        user_id: userId,
        script_id: script_id,
    })

    // console.log("delete: ", deleteScript)
    return ResponseNamespace.sendSuccessMessage(
        res,
        deleteScript,
        res.status(200).statusCode,
        'Script deleted successfully'
    );
}catch (error) {
    console.log('Error deleting script ', error, error && error.message);
    return ResponseNamespace.sendErrorMessage(
    req,
    res,
    error,
    res.status(500).statusCode,
    'Error deleting script '
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

        // console.log("updateResult: ", updateResults)
  
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








// export const deleteScriptsById = async (req: Request, res: Response) => {
            //     const { user_id } = req.params;
            //     const { scriptIds } = req.body; 
            // try{
            //     // Convert the string user_id to a Types.ObjectId
            //     const userId = new Types.ObjectId(user_id);
            
            //     const deleteScript = await deleteScripts({
            //         user_id: userId,
            //         scriptIds 
            //     })
            
            //     console.log("delete: ", deleteScript)
            //     return ResponseNamespace.sendSuccessMessage(
            //         res,
            //         deleteScript,
            //         res.status(200).statusCode,
            //         'Deleted scripts successfully'
            //     );
            // }catch (error) {
            //     console.log('Error deleting scripts', error, error && error.message);
            //     return ResponseNamespace.sendErrorMessage(
            //     req,
            //     res,
            //     error,
            //     res.status(500).statusCode,
            //     'Error deleting scripts'
            //     );
            // }
            // };
  