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

