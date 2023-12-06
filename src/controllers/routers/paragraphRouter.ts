import express from 'express'
import ParagraphController from 'controllers/scriptController/ParagraphController'
import { authMiddleware } from '../middlewares/jwtHandler'

export const router = express.Router()

router.post(
  '/create-paragraph',
  authMiddleware,
  ParagraphController.createParagraph,
)

router.get(
  '/fetch-paragraphs',
  authMiddleware,
  ParagraphController.getAllParagraphsInChapter,
)