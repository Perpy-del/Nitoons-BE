import ChapterModel, { IChapter } from './models/ChapterModel'
import ResponseNamespace from '../../utils/responses_namespace'
import { Request, Response } from 'express'
export default class ScriptChapters {
  public static async addChapter(req: Request, res: Response) {
    const { script_id }: IChapter = req.body
    try {
      const newChapter = await ChapterModel.create({ script_id })

      return ResponseNamespace.sendSuccessMessage(
        res,
        newChapter,
        res.status(200).statusCode,
        'Chapter created successfully',
      )
    } catch (error) {
      console.log('Error creating new chapter', error, error && error.message)
      return ResponseNamespace.sendErrorMessage(
        req,
        res,
        error,
        res.status(500).statusCode,
        'Error creating new chapter',
      )
    }
  }

  public static async updateChapter(req: Request, res: Response) {
    const scriptId: string = req.params.script_id
    const chapterId: IChapter = req.body.chapter_id
    const updateDetails: IChapter = { ...req.body }

    try {
      const updateQuery = await ChapterModel.findOne({
        _id: chapterId,
        script_id: scriptId,
      })
      if (updateDetails?.title) {
        updateQuery.title = updateDetails.title
      }
      if (updateDetails?.content) {
        updateQuery.content = updateDetails.content
      }

      const result = await ChapterModel.updateOne(
        {
          _id: chapterId,
          script_id: scriptId,
        },
        { ...updateQuery },
        { new: true },
      )

      return ResponseNamespace.sendSuccessMessage(
        res,
        result,
        res.status(200).statusCode,
        'Chapter updated successfully',
      )
    } catch (error) {
      console.log(
        'Error updating script chapter',
        error,
        error && error.message,
      )
      return ResponseNamespace.sendErrorMessage(
        req,
        res,
        error,
        res.status(500).statusCode,
        'Error updating script chapter',
      )
    }
  }

  public static async deleteChapter(req: Request, res: Response) {
    const scriptId: string = req.params.script_id
    const chapterId: string = req.body.chapter_id

    try {
      const deletedChapter = await ChapterModel.findOneAndUpdate(
        {
          _id: chapterId,
          script_id: scriptId,
        },
        { deleted: true },
        { new: true },
      )

      return ResponseNamespace.sendSuccessMessage(
        res,
        deletedChapter,
        res.status(200).statusCode,
        'Chapter deleted successfully',
      )
    } catch (error) {
      console.log(
        'Error deleting script chapter',
        error,
        error && error.message,
      )
      return ResponseNamespace.sendErrorMessage(
        req,
        res,
        error,
        res.status(500).statusCode,
        'Error deleting script chapter',
      )
    }
  }

  public static async getChapterById(req: Request, res: Response) {
    const scriptId: string = req.params.script_id
    const chapterId: string = req.body.chapter_id

    try {
      const data = await ChapterModel.findById({
        _id: chapterId,
        script_id: scriptId,
      })

      return ResponseNamespace.sendSuccessMessage(
        res,
        data,
        res.status(200).statusCode,
        'Chapter found successfully',
      )
    } catch (error) {
      console.log(
        'Error fetching script chapter',
        error,
        error && error.message,
      )
      return ResponseNamespace.sendErrorMessage(
        req,
        res,
        error,
        res.status(500).statusCode,
        'Error fetching script chapter',
      )
    }
  }

  public static async getAllChapters(req: Request, res: Response) {
    const scriptId: string = req.params.script_id
    const chapterId: string = req.body.chapter_id

    try {
      const data = await ChapterModel.find({
        _id: chapterId,
        script_id: scriptId,
        deleted: { $ne: true },
      })

      return ResponseNamespace.sendSuccessMessage(
        res,
        data,
        res.status(200).statusCode,
        'All chapters found successfully',
      )
    } catch (error) {
      console.log(
        'Error fetching all chapters in script',
        error,
        error && error.message,
      )
      return ResponseNamespace.sendErrorMessage(
        req,
        res,
        error,
        res.status(500).statusCode,
        'Error fetching all chapters in script',
      )
    }
  }
}
