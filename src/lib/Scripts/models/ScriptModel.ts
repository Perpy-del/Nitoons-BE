import { Schema, model, Document, Types } from 'mongoose'

export interface IScript extends Document {
  title: string
  isStarred: boolean
  isTrashed: boolean
  isDeleted: boolean
  user_id: Types.ObjectId
  created_at: Date
  updated_at: Date
}

const ScriptSchema: Schema = new Schema(
  {
    title: { type: String, default: 'undefined' },
    isStarred: { type: Boolean, default: false },
    isTrashed: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    user_id: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  },
)

const ScriptModel = model<IScript>('script', ScriptSchema)

export default ScriptModel
