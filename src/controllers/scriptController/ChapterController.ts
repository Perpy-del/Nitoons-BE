import ChapterModel, { IChapter } from '../../lib/Scripts/models/ChapterModel'
import ResponseNamespace from '../../utils/responses_namespace'
import { Request, Response } from 'express'
import ChapterNamespace from '../../lib/Scripts/Chapter'
import { Types } from 'mongoose'
import { io } from '../../app';
import { chapterIndex } from '../../lib/db/pinecone'

export default class ScriptChapters {

  public static async createNewChapter(scriptId: any) {
    try {
      const newChapter = await ChapterNamespace.addChapter({ scriptId })
      
      io.emit('new-chapter', {chapter: newChapter })

    } catch (error) {
      console.log('Error creating new chapter', error, error && error.message)
    }
  }

  public static async updateChapterDetails(chapter_id: string, scriptId: string, userId: string, newContent: any[]) {
    try {
      const updatedChapter = await ChapterNamespace.updateChapter(chapter_id, newContent )     

      const chapters = await ChapterModel.find({ script_id: scriptId, deleted: { $ne: true }, })
      console.log('chapters: ', chapters)
        
      const chapterContents = chapters.map((chapter) => chapter.content);

      console.log('Fetched Chapter Contents:', chapterContents);

      const refinedArray = chapterContents.map(chapter => {
        return chapter
          .filter((paragraph:any) => paragraph.content) 
          .map((paragraph:any) =>{
            return paragraph.content[0].text
          })
      }).flat();
        
      console.log("refinedArray: ", refinedArray);
      const joinedChapterContent = refinedArray.join("\n");

      console.log("joinedChapterContent: ", joinedChapterContent);
      const embedding = await ChapterNamespace.getEmbeddingForChapter(joinedChapterContent)

      await chapterIndex.upsert([
        {
          id: scriptId,
          values: embedding,
          metadata: {userId}
        }
      ])
      
    } catch (error) {
      console.log('Error creating new chapter', error, error && error.message)
    }
  }

  public static async updateChapterName(req: Request, res: Response) {
    const { user_id } = req.params
    const { chapter_id, title } = req.body
    try {
      const userId = new Types.ObjectId(user_id)

      const chapterTitle = await ChapterNamespace.updateChapterTitle({
        user_id: userId,
        chapter_id,
        title
      })

      return ResponseNamespace.sendSuccessMessage(
        res,
        chapterTitle,
        res.status(200).statusCode,
        'Chapter title updated successfully',
      )
    } catch (error) {
      console.log('Error updating script title', error, error && error.message)
      return ResponseNamespace.sendErrorMessage(
        req,
        res,
        error,
        res.status(500).statusCode,
        'Error updating chapter title',
      )
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
