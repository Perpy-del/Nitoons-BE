// import { StringDecoder } from 'string_decoder'
import { Types } from 'mongoose';
import ChapterModel, { IChapter } from '../Scripts/models/ChapterModel'
import { getEmbedding } from '../../lib/openai';

export default class ChapterNamespace {
  public static async addChapter(chapterDetails: {
    scriptId: string
  }): Promise<IChapter> {
    return ChapterModel.create({
      script_id: chapterDetails.scriptId,
    })
  }

  public static async fetchChapter(
    chapter_id: string, 
  ): Promise<IChapter> {
    return ChapterModel.findOne({
      _id: chapter_id,
    })
  }

  public static async  updateChapter(
    chapter_id: string, 
    newContent: any[]
    ): Promise<IChapter> {
    try {
      const chapter = await ChapterModel.findById(chapter_id);
  
      if (!chapter) {
        throw new Error('Chapter not found');
      }
  
      chapter.content = newContent;
  
      const updatedChapter = await chapter.save();
  
      return updatedChapter;
    } catch (error) {
      throw new Error(`Error updating chapter content: ${error.message}`);
    }
  }

  public static async updateChapterTitle(chapterDetails: {
    user_id: Types.ObjectId
    chapter_id: Types.ObjectId
    title: string
  }) {
    const titleChapter = ChapterModel.findOneAndUpdate(
      {
        user_id: chapterDetails.user_id,
        _id: chapterDetails.chapter_id,
      },
      {
        title: chapterDetails.title,
      },
      { new: true },
    )
    return titleChapter
  }

  public static async deleteChapter(chapterDetails: {
    scriptId: string
    chapterId: string
  }) {
    return ChapterModel.findOneAndUpdate(
      {
        _id: chapterDetails.chapterId,
        script_id: chapterDetails.scriptId,
      },
      { deleted: true },
      { new: true },
    )
  }

  public static async getChapterById(chapterDetails: {
    scriptId: string
    chapterId: string
  }) {
    return ChapterModel.findById({
      _id: chapterDetails.chapterId,
      script_id: chapterDetails.scriptId,
    })
  }

  public static async getAllChapters(chapterDetails: { scriptId: string }) {
    return ChapterModel.find({
      script_id: chapterDetails.scriptId,
      deleted: { $ne: true },
    })
  }

  public static async getEmbeddingForChapter(content: string | undefined) {
    return getEmbedding(content ?? "");
  }
}
