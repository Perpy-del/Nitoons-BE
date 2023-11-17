import ScriptModel, { IScript } from '../Scripts/models/ScriptModel'
import { Types } from 'mongoose'

export default class ScriptNamespace {
  public static async createNewScript(scriptDetails: {
    user_id: Types.ObjectId
  }): Promise<IScript> {
    const newScript = new ScriptModel({
      user_id: scriptDetails.user_id,
    })
    const savedScript = newScript.save()
    return savedScript
  }

  public static async getScripts (scriptDetails: { user_id: Types.ObjectId }): Promise<IScript[]> {
    const userScripts = ScriptModel.find({
      user_id: scriptDetails.user_id,
    })
    return userScripts
  }

  public static async trashScripts (scriptDetails: {
    user_id: Types.ObjectId
    scriptIds: string[]
  }) {
    const trashScripts = ScriptModel.updateMany(
      {
        user_id: scriptDetails.user_id,
        _id: { $in: scriptDetails.scriptIds },
      },
      {
        $set: { isTrashed: true },
      },
    )
    return trashScripts
  }

  public static async updateScriptTitle (scriptDetails: {
    user_id: Types.ObjectId
    script_id: Types.ObjectId
    title: string
  }): Promise<IScript> {
    const titleScripts = ScriptModel.findOneAndUpdate(
      {
        user_id: scriptDetails.user_id,
        _id: scriptDetails.script_id,
      },
      {
        title: scriptDetails.title,
      },
      { new: true },
    )
    return titleScripts
  }

  public static async updatetrashScript (scriptDetails: {
    user_id: Types.ObjectId
    script_id: Types.ObjectId
  }): Promise<IScript> {
    const trashedScript = ScriptModel.findOneAndUpdate(
      {
        user_id: scriptDetails.user_id,
        _id: scriptDetails.script_id,
      },
      {
        isTrashed: true,
      },
      { new: true },
    )
    return trashedScript
  }

  public static async updatetrashScriptFalse (scriptDetails: {
    user_id: Types.ObjectId
    script_id: Types.ObjectId
  }): Promise<IScript> {
    const trashedScript = ScriptModel.findOneAndUpdate(
      {
        user_id: scriptDetails.user_id,
        _id: scriptDetails.script_id,
      },
      {
        isTrashed: false,
      },
      { new: true },
    )
    return trashedScript
  }

  public static async deleteSingleScript (scriptDetails: {
    user_id: Types.ObjectId
    script_id: Types.ObjectId
  }): Promise<IScript> {
    const deletedScript = ScriptModel.findOneAndUpdate(
      {
        user_id: scriptDetails.user_id,
        _id: scriptDetails.script_id,
      },
      {
        isDeleted: true,
      },
      { new: true },
    )
    return deletedScript
  }

  public static async duplicateScript (scriptDetails: {
    user_id: Types.ObjectId
    script_id: Types.ObjectId
  }): Promise<IScript> {
    try {
      // Step 1: Find the original script
      const originalScript = await ScriptModel.findOne({
        user_id: scriptDetails.user_id,
        _id: scriptDetails.script_id,
      })

      // Step 2: Duplicate the script content
      const duplicatedScriptContent = { ...originalScript.toObject() }
      delete duplicatedScriptContent._id // Remove the original script ID to generate a new one

      // Step 3: Create a new script with duplicated content
      const duplicatedScript = await ScriptModel.create({
        user_id: scriptDetails.user_id,
        ...duplicatedScriptContent,
      })

      return duplicatedScript
    } catch (error) {
      // Handle any errors that might occur during the process
      console.error('Error duplicating script:', error)
      throw new Error('Failed to duplicate script')
    }
  }

  public static async updateAllScripts (scriptDetails: {
    user_id: Types.ObjectId
    scripts: Array<{
      _id: Types.ObjectId
      title: string
      isStarred: boolean
      isTrashed: boolean
      user_id: Types.ObjectId
      created_at: Date
      updated_at: Date
      __v: number
    }>
  }): Promise<IScript[]> {
    const updatedScripts = await Promise.all(
      scriptDetails.scripts.map(async script => {
        const { _id, ...scriptUpdates } = script
        const updatedScript = await ScriptModel.findOneAndUpdate(
          {
            user_id: scriptDetails.user_id,
            _id: script._id,
          },
          scriptUpdates,
          { new: true },
        )
        return updatedScript
      }),
    )
    return updatedScripts
  }
}
