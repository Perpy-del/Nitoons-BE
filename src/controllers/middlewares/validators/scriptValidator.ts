import Joi from 'joi'
import { Request, Response, NextFunction } from 'express'

//Validate User Id
export function validateUserId(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { user_id } = req.params

  const user_idSchema = Joi.string()
    .pattern(new RegExp('^[0-9a-fA-F]{24}$'))
    .required()
  const validationResult = user_idSchema.validate(user_id)

  if (validationResult.error) {
    return res
      .status(400)
      .json({ error: `${validationResult.error.details[0].message},` })
  }

  next()
}

//Validate User Id And  Script Id
export function validateScriptId(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { user_id } = req.params
  const { script_id } = req.body

  const script_idSchema = Joi.object({
    user_id: Joi.string().pattern(new RegExp('^[0-9a-fA-F]{24}$')).required(),
    script_id: Joi.string().pattern(new RegExp('^[0-9a-fA-F]{24}$')).required(),
  })
  const validationResult = script_idSchema.validate({ user_id, script_id })

  if (validationResult.error) {
    return res
      .status(400)
      .json({ error: `${validationResult.error.details[0].message},` })
  }
  next()
}

//Validate User Id , Script Id And Script Title
export function validateScriptTitle(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { user_id } = req.params
  const { script_id, title } = req.body

  const script_idSchema = Joi.object({
    user_id: Joi.string().pattern(new RegExp('^[0-9a-fA-F]{24}$')).required(),
    script_id: Joi.string().pattern(new RegExp('^[0-9a-fA-F]{24}$')).required(),
    title: Joi.string().required(),
  })
  const validationResult = script_idSchema.validate({
    user_id,
    script_id,
    title,
  })

  if (validationResult.error) {
    return res
      .status(400)
      .json({ error: `${validationResult.error.details[0].message},` })
  }

  next()
}

//Validate User Id And Array Of Script Ids
export function validateScriptIds(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { user_id } = req.params
  const { scriptIds } = req.body

  const script_idSchema = Joi.object({
    user_id: Joi.string().pattern(new RegExp('^[0-9a-fA-F]{24}$')).required(),
    scriptIds: Joi.array()
      .items(Joi.string().pattern(new RegExp('^[0-9a-fA-F]{24}$')))
      .required(),
  })
  const validationResult = script_idSchema.validate({ user_id, scriptIds })

  if (validationResult.error) {
    return res
      .status(400)
      .json({ error: `${validationResult.error.details[0].message},` })
  }

  next()
}

export function validateScriptData(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { user_id } = req.params
  const scripts = req.body.scripts

  const ScriptSchema = Joi.object({
    _id: Joi.string().required(),
    title: Joi.string().default('undefined'),
    isStarred: Joi.boolean().default(false),
    isTrashed: Joi.boolean().default(false),
    isDeleted: Joi.boolean().default(false),
    user_id: Joi.string().pattern(new RegExp('^[0-9a-fA-F]{24}$')).required(),
    created_at: Joi.date().required(),
    updated_at: Joi.date().required(),
    __v: Joi.number().required(),
  })

  const schema = Joi.array().items(ScriptSchema)
  const validationResult = schema.validate(scripts)
  if (validationResult.error) {
    return res
      .status(400)
      .json({ error: `${validationResult.error.details[0].message} sam` })
  }

  const userIdValidationResult = Joi.string()
    .pattern(new RegExp('^[0-9a-fA-F]{24}$'))
    .validate(user_id)

  if (userIdValidationResult.error) {
    return res
      .status(400)
      .json({ error: userIdValidationResult.error.details[0].message })
  }
  next()
}
