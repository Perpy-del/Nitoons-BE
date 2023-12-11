// import { Types } from 'joi'
import { Schema, model, Document, Types } from 'mongoose'

export interface IParagraph extends Document {
  content: string
  deleted: boolean
  chapter_id: Types.ObjectId
}

const ParagraphSchema: Schema = new Schema({
  chapter_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'chapter',
  },
  content: {
    type: String,
    required: true,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
})

const ParagraphModel = model<IParagraph>('paragraph', ParagraphSchema)

export default ParagraphModel
