import { Schema, model, Types, Document } from 'mongoose'

export interface IChapter extends Document {
  title: string
  script_id: string
  content: string
  deleted: boolean
}

const ChapterSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      default: 'Chapter One',
    },
    script_id: {
      type: Schema.Types.ObjectId,
      ref: 'script',
      required: true,
    },
    content: {
      type: Schema.Types.Mixed,
      ref: 'Paragraph',
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
)

const ChapterModel = model<IChapter>('chapter', ChapterSchema)

export default ChapterModel
