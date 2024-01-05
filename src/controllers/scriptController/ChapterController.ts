import ChapterModel, { IChapter } from '../../lib/Scripts/models/ChapterModel'
import ResponseNamespace from '../../utils/responses_namespace'
import { Request, Response } from 'express'
import ChapterNamespace from '../../lib/Scripts/Chapter'
import mongoose, { Types } from 'mongoose'
import { io } from '../../app'
import { chapterIndex } from '../../lib/db/pinecone'
import openai, { getEmbedding } from '../../lib/openai'

export default class ScriptChapters {
  public static async createNewChapter(scriptId: any) {
    try {
      const newChapter = await ChapterNamespace.addChapter({ scriptId })

      io.emit('new-chapter', { chapter: newChapter })
    } catch (error) {
      console.log('Error creating new chapter', error, error && error.message)
    }
  }

  public static async updateChapterDetails(
    chapter_id: string,
    scriptId: string,
    userId: string,
    newContent: any[],
  ) {
    try {
      const updatedChapter = await ChapterNamespace.updateChapter(
        chapter_id,
        newContent,
      )

      const chapters = await ChapterModel.find({
        script_id: scriptId,
        deleted: { $ne: true },
      })
      console.log('chapters: ', chapters)

      const chapterContents = chapters.map(chapter => chapter.content)

      console.log('Fetched Chapter Contents:', chapterContents)

      const refinedArray = chapterContents
        .map(chapter => {
          return chapter
            .filter((paragraph: any) => paragraph.content)
            .map((paragraph: any) => {
              return paragraph.content[0].text
            })
        })
        .flat()

      const joinedChapterContent = refinedArray.join('\n')

      const embedding =
        await ChapterNamespace.getEmbeddingForChapter(joinedChapterContent)

      await chapterIndex.upsert([
        {
          id: scriptId,
          values: embedding,
          metadata: { userId },
        },
      ])
    } catch (error) {
      console.log('Error creating new chapter', error, error && error.message)
    }
  }

  static conversationHistory: any = [];

  public static async fetchAndCompareEmbeddings(req: Request, res: Response) {

    try {
      const { scriptId, messages } = req.body

      const embedding = await getEmbedding(messages)

      const queryResults = await chapterIndex.query({
        vector: embedding,
        topK: 5,
      })

      const relevantChapter = await ChapterModel.find({
        script_id: {
          $in: queryResults.matches.map(match => match.id),
        },
      })

      const relevantContent = relevantChapter.map(
        chapter => chapter?.content[0]?.content[0]?.text,
      )

      const stream = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo-1106', // Use the GPT-3.5 Turbo model
        messages: [
          {
            role: 'user',
            content: messages
          },
          {
            role: 'assistant',
            content:
              'You are an intelligent script-writing assistant.' +
              "You answer the user's questions based on their existing content" +
              "You provide suggestions to help with writer's block and try to complete the user's thoughts" +
              'You also provide more context to the story making it more interesting' +
              'The relevant content for this query are:\n' +
              `${relevantContent}`,
          }
        ],
        n: 1, // Number of suggestions
        stop: null,
        temperature: 0.5,
      })

      const streamChoices = stream.choices.map(choice => choice.message)
      console.log(streamChoices[0].content)
      const streamContent = streamChoices[0].content

      ScriptChapters.conversationHistory.push({ role: 'user', content: messages });
      ScriptChapters.conversationHistory.push({ role: 'assistant', content: streamContent });

      console.log("Conversation history", ScriptChapters.conversationHistory)

      return ResponseNamespace.sendSuccessMessage(
        res,
        ScriptChapters.conversationHistory,
        res.status(200).statusCode,
        'AI response successful',
      )
    } catch (error) {
      console.log('Error fetching embeddings', error, error && error.message)
      return ResponseNamespace.sendErrorMessage(
        req,
        res,
        error,
        res.status(500).statusCode,
        'Error fetching embeddings',
      )
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
        title,
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
      const fetchedChapter = await ChapterNamespace.fetchChapter(chapter_id)

      io.emit('fetched-chapter', { fetchedChapter: fetchedChapter })
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
