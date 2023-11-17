import ChapterModel, { IChapter } from '../Scripts/models/ChapterModel'

export default class ChapterNamespace {
  public static async addChapter(chapterDetails: {
    scriptId: string
  }): Promise<IChapter> {
    return ChapterModel.create({
      script_id: chapterDetails.scriptId,
    })
  }

  public static async updateChapter(
    chapterId: string,
    updateDetails: { title?: string; content?: string },
  ): Promise<IChapter> {
    try {
      const updateQuery = await ChapterModel.findById({
        _id: chapterId,
      })
      if (!updateDetails) {
        throw new Error('Chapter not found')
      }
      if (updateDetails?.title) {
        updateQuery.title = updateDetails.title
      }
      if (updateDetails?.content) {
        updateQuery.content = updateDetails.content
      }

      const updatedChapter = await updateQuery.save()

      return updatedChapter
    } catch (error) {
      console.log(
        'Error updating script chapter',
        error,
        error && error.message,
      )
      throw error
    }
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

  public static async getAllChapters(chapterDetails: {
    scriptId: string
    chapterId: string
  }) {
    return ChapterModel.find({
      _id: chapterDetails.chapterId,
      script_id: chapterDetails.scriptId,
      deleted: { $ne: true },
    })
  }
}
