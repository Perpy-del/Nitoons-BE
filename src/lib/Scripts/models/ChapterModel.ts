// import { Schema, model, Document } from 'mongoose'

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

import { Schema, model, Document } from 'mongoose';

export interface IChapter extends Document {
  title?: string;
  script_id: string;
  content?: any[]; 
  deleted?: boolean;
}

const ChapterSchema: Schema = new Schema(
  {
    title: {
      type: String,
      default: 'Chapter One',
    },
    script_id: {
      type: Schema.Types.ObjectId,
      ref: 'script',
      required: true,
    },
    content: {
      type: [Object], 
      // default: {
      //   type: "doc",
      //   content: [
      //     {
      //       type: "paragraph",
      //       content: [
      //         {
      //           type: "text",
      //           text: "start here ..."
      //         }
      //       ]
      //     }
      //   ]
      // },
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const ChapterModel = model<IChapter>('chapter', ChapterSchema);

export default ChapterModel;


