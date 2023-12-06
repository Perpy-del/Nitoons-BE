import ParagraphModel from '../Scripts/models/ParagraphModel'
import Paragraph, { IParagraph } from '../Scripts/models/ParagraphModel'
import { Types } from 'mongoose'

export default class ParagraphNamespace {
    public static async createNewParagraph(details: {
      chapter_id: Types.ObjectId
    }): Promise<IParagraph> {
      const newParagraph = ParagraphModel.create({
        chapter_id: details.chapter_id,
      })
      return newParagraph
    }

    public static async getAllParagraphs(details: {
      chapter_id: Types.ObjectId
    }) {
      const fetchedParagraphs = ParagraphModel.find({
        chapter_id: details.chapter_id,
      })
      return fetchedParagraphs
    }
}