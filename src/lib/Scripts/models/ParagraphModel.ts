import { Schema, model, Document } from 'mongoose';

export interface IParagraph extends Document {
    content: string;
    deleted: boolean;
}

const ParagraphSchema: Schema = new Schema({
    content: {
        type: String,
        required: true,
    },
    deleted: {
        type: Boolean,
        default: false,
    }
})

const ParagraphModel = model<IParagraph>('paragraph', ParagraphSchema);

export default ParagraphModel;