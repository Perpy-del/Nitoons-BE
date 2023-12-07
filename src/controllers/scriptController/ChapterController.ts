import ChapterModel, { IChapter } from '../../lib/Scripts/models/ChapterModel'
import ResponseNamespace from '../../utils/responses_namespace'
import { Request, Response } from 'express'
import ChapterNamespace from '../../lib/Scripts/Chapter'
import { Types } from 'mongoose'
import { io } from '../../app';

export default class ScriptChapters {
  // public static async createNewChapter(req: Request, res: Response) {
  //   const scriptId = req.body.script_id

  //   try {
  //     const newChapter = await ChapterNamespace.addChapter({ scriptId })

  //     return ResponseNamespace.sendSuccessMessage(
  //       res,
  //       newChapter,
  //       res.status(200).statusCode,
  //       'Chapter created successfully',
  //     )
  //   } catch (error) {
  //     console.log('Error creating new chapter', error, error && error.message)
  //     return ResponseNamespace.sendErrorMessage(
  //       req,
  //       res,
  //       error,
  //       res.status(500).statusCode,
  //       'Error creating new chapter',
  //     )
  //   }
  // }

  // public static async createNewChapter(req: Request, res: Response) {
  //   const scriptId = req.body.script_id

  //   try {
  //     const newChapter = await ChapterNamespace.addChapter({ scriptId })
      
  //     io.emit('new-chapter', { scriptId, chapter: newChapter })

  //     return ResponseNamespace.sendSuccessMessage(
  //       res,
  //       newChapter,
  //       res.status(200).statusCode,
  //       'Chapter created successfully',
  //     )
  //   } catch (error) {
  //     console.log('Error creating new chapter', error, error && error.message)
  //     return ResponseNamespace.sendErrorMessage(
  //       req,
  //       res,
  //       error,
  //       res.status(500).statusCode,
  //       'Error creating new chapter',
  //     )
  //   }
  // }

  public static async createNewChapter(scriptId: any) {
    try {
      const newChapter = await ChapterNamespace.addChapter({ scriptId })
      
      io.emit('new-chapter', {chapter: newChapter })

    } catch (error) {
      console.log('Error creating new chapter', error, error && error.message)
    }
  }

  public static async updateChapterDetails(chapter_id: string, newContent: any[]) {
    try {
      const updatedChapter = await ChapterNamespace.updateChapter(chapter_id, newContent )
      
      // io.emit('updated-chapter', {updatedChapter: updatedChapter })

    } catch (error) {
      console.log('Error creating new chapter', error, error && error.message)
    }
  }

  public static async fetchChapterDetails(chapter_id: string) {
    try {
      const fetchedChapter = await ChapterNamespace.fetchChapter(chapter_id )
      
      io.emit('fetched-chapter', {fetchedChapter: fetchedChapter })

    } catch (error) {
      console.log('Error creating new chapter', error, error && error.message)
    }
  }

  // public static async updateChapterDetails(req: Request, res: Response) {
  //   const chapterId = req.body.chapter_id
  //   const updateDetails = { ...req.body }

  //   try {
  //     const updatedChapter = await ChapterNamespace.updateChapter(chapterId, {
  //       ...updateDetails,
  //     })

  //     return ResponseNamespace.sendSuccessMessage(
  //       res,
  //       updatedChapter,
  //       res.status(200).statusCode,
  //       'Chapter updated successfully',
  //     )
  //   } catch (error) {
  //     console.log(
  //       'Error updating script chapter',
  //       error,
  //       error && error.message,
  //     )
  //     return ResponseNamespace.sendErrorMessage(
  //       req,
  //       res,
  //       error,
  //       res.status(500).statusCode,
  //       'Error updating script chapter',
  //     )
  //   }
  // }

  public static async deleteScriptChapter(req: Request, res: Response) {
    const scriptId: string = req.params.script_id
    const chapterId: string = req.body.chapter_id

    try {
      const deletedChapter = await ChapterNamespace.deleteChapter({
        scriptId,
        chapterId,
      })

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

  public static async getChapter(req: Request, res: Response) {
    const scriptId: string = req.params.script_id
    const chapterId: string = req.body.chapter_id

    try {
      const data = await ChapterNamespace.getChapterById({
        scriptId,
        chapterId,
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

  public static async getAllChaptersInScript(req: Request, res: Response) {
    const scriptId: string = req.params.script_id

    try {
      const data = await ChapterNamespace.getAllChapters({
        scriptId,
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
