"use strict";
// import { Schema, model, Document } from 'mongoose'
Object.defineProperty(exports, "__esModule", { value: true });
// export interface IChapter extends Document {
//   title?: string
//   script_id: string
//   content?: string
//   deleted?: boolean
// }
// const ChapterSchema: Schema = new Schema(
//   {
//     title: {
//       type: String,
//       default: 'Chapter One',
//     },
//     script_id: {
//       type: Schema.Types.ObjectId,
//       ref: 'script',
//       required: true,
//     },
//     content: {
//       type: Schema.Types.Mixed,
//       ref: 'paragraph',
//     },
//     deleted: {
//       type: Boolean,
//       default: false,
//     },
//   },
//   {
//     timestamps: true,
//   },
// )
// const ChapterModel = model<IChapter>('chapter', ChapterSchema)
// export default ChapterModel
const mongoose_1 = require("mongoose");
const ChapterSchema = new mongoose_1.Schema({
    title: {
        type: String,
        default: 'Chapter One',
    },
    script_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'script',
        required: true,
    },
    content: {
        type: [mongoose_1.Schema.Types.Mixed],
        default: [],
    },
    deleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
const ChapterModel = (0, mongoose_1.model)('chapter', ChapterSchema);
exports.default = ChapterModel;
//# sourceMappingURL=ChapterModel.js.map