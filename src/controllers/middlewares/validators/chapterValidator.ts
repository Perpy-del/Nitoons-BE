import Joi, { valid } from 'joi'
import { Request, Response, NextFunction } from 'express'

export const addChapterValidator = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const validateNewChapter = Joi.object({
    script_id: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required()
      .messages({
        'string.pattern.base': 'Invalid script id',
      }),
  })
  const { error } = validateNewChapter.validate(req.body)
  if (error) {
    console.log(error)
    throw error
  }
  next()
}

export const updateChapterValidator = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { script_id } = req.params
  const { chapter_id, title, content } = req.body
  const validateUpdateChapter = Joi.object({
    script_id: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required()
      .messages({
        'string.pattern.base': 'Invalid script id',
      }),
    chapter_id: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required()
      .messages({
        'string.pattern.base': 'Invalid chapter id',
      }),
    title: Joi.string().messages({
      'string.pattern.base': 'Please enter a valid title',
    }),
    content: Joi.string().messages({
      'string.pattern.base': 'Please enter a valid content',
    }),
  })

  const { error } = validateUpdateChapter.validate({
    script_id,
    chapter_id,
    title,
    content,
  })
  if (error) {
    console.log(error)
    throw error
  }
  next()
}

export const chapterValidator = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { script_id } = req.params
  const { chapter_id } = req.body

  const validateChapter = Joi.object({
    script_id: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required()
      .messages({
        'string.pattern.base': 'Invalid script id',
      }),
    chapter_id: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required()
      .messages({
        'string.pattern.base': 'Invalid chapter id',
      }),
  })

  const { error } = validateChapter.validate({ script_id, chapter_id })
  if (error) {
    console.log(error)
    throw error
  }
  next()
}

export const allChaptersValidator = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { script_id } = req.params

  const validateChaptersInScript = Joi.object({
    script_id: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required()
      .messages({
        'string.pattern.base': 'Invalid script id',
      }),
  })

  const { error } = validateChaptersInScript.validate({ script_id })
  if (error) {
    console.log(error)
    throw error
  }
  next()
}
