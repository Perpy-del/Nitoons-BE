import { Request, Response } from 'express'
import ResponseNamespace from '../../utils/responses_namespace'
import { Types } from 'mongoose'
import ParagraphNamespace from 'lib/Scripts/Paragraph'
import { io } from 'app'

export default class ParagraphController {
    public static async createParagraph(chapter_id: any) {
        try {
          const newChapter = await ParagraphNamespace.createNewParagraph({ chapter_id })
          
          io.emit('new-chapter', { chapter: newChapter })
    
        } catch (error) {
          console.log('Error creating new chapter', error, error && error.message)
        }
      }

      public static async getAllParagraphsInChapter(req: Request, res: Response) {
        const chapter_id = req.params.chapter_id
    
        try {
          const chapterId = new Types.ObjectId(chapter_id)
          const data = await ParagraphNamespace.getAllParagraphs({
            chapter_id: chapterId
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