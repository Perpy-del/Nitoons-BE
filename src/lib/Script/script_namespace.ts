import ScriptModel from "../../models/ScriptModel/scriptModel";
import { Types } from "mongoose";

export const createNewScript = async (props: {
    user_id: Types.ObjectId;
}) => {
    const newScript = new ScriptModel({
        user_id: props.user_id
    });
    const savedScript =  newScript.save();
    return savedScript 
};


export const getScripts = async (props: {
    user_id: Types.ObjectId;
}) => {
    const userScripts =  ScriptModel.find({
        user_id: props.user_id
    });
    return userScripts
    
};


export const deleteScripts = async (props: {
    user_id: Types.ObjectId;
    scriptIds: string[];
}) => {
    const deletedScripts =  ScriptModel.deleteMany({
         user_id: props.user_id,
         _id: { $in: props.scriptIds }
    });
    return deletedScripts
};


export const trashScripts = async (props: {
    user_id: Types.ObjectId;
    scriptIds: string[];
}) => {
    const trashScripts =  ScriptModel.updateMany(
        {
            user_id: props.user_id,
            _id: { $in: props.scriptIds }
        },
        {
            $set: { isTrashed: true }
        }
    );
    return trashScripts
};


export const updateScriptTitle = async (props: {
    user_id: Types.ObjectId;
    script_id: Types.ObjectId;
    title: string;
}) => {
    const titleScripts =  ScriptModel.findOneAndUpdate(
        {
            user_id: props.user_id,
            _id:  props.script_id 
        },
        {
           title: props.title
        },
        {new: true}
    );
    return titleScripts
};

export const updatetrashScript = async (props: {
    user_id: Types.ObjectId;
    script_id: Types.ObjectId;
}) => {
    const trashedScript =  ScriptModel.findOneAndUpdate(
        {
            user_id: props.user_id,
            _id:  props.script_id 
        },
        {
            isTrashed: true
        },
        {new: true}
    );
    return trashedScript
};

export const updatetrashScriptFalse = async (props: {
    user_id: Types.ObjectId;
    script_id: Types.ObjectId;
}) => {
    const trashedScript =  ScriptModel.findOneAndUpdate(
        {
            user_id: props.user_id,
            _id:  props.script_id 
        },
        {
            isTrashed: false
        },
        {new: true}
    );
    return trashedScript
};

export const deleteSingleScript = async (props: {
    user_id: Types.ObjectId;
    script_id: Types.ObjectId;
}) => {
    const deletedScript =  ScriptModel.findOneAndUpdate(
        {
            user_id: props.user_id,
            _id:  props.script_id 
        },
        {
            isDeleted: true
        },
        {new: true}
    );
    return deletedScript
};


export const duplicateScript = async (props: {
    user_id: Types.ObjectId;
    script_id: Types.ObjectId;
}) => {
    try {
        // Step 1: Find the original script
        const originalScript = await ScriptModel.findOne({
            user_id: props.user_id,
            _id: props.script_id,
        });

        // Step 2: Duplicate the script content
        const duplicatedScriptContent = { ...originalScript.toObject() };
        delete duplicatedScriptContent._id; // Remove the original script ID to generate a new one

        // Step 3: Create a new script with duplicated content
        const duplicatedScript = await ScriptModel.create({
            user_id: props.user_id,
            ...duplicatedScriptContent,
        });

        return duplicatedScript;
    } catch (error) {
        // Handle any errors that might occur during the process
        console.error('Error duplicating script:', error);
        throw new Error('Failed to duplicate script');
    }
};



export const updateAllScripts = async (props: {
    user_id: Types.ObjectId;
    scripts: Array<{
        _id: Types.ObjectId;
        title: string;
        isStarred: boolean;
        isTrashed: boolean;
        user_id: Types.ObjectId;
        created_at: Date;
        updated_at: Date;
        __v: number;
    }>;
}) => {
    const updatedScripts = await Promise.all(
        props.scripts.map(async (script) => {
            const { _id, ...scriptUpdates } = script;
            const updatedScript = await ScriptModel.findOneAndUpdate(
                {
                    user_id: props.user_id,
                    _id: script._id,
                },
                scriptUpdates,
                { new: true }
            );
            return updatedScript;
        })
    );
    return updatedScripts;
};

