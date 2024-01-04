"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateScriptData = exports.validateScriptIds = exports.validateScriptTitle = exports.validateScriptAndUserId = exports.validateScriptId = exports.validateUserId = void 0;
const joi_1 = __importDefault(require("joi"));
//Validate User Id
function validateUserId(req, res, next) {
    const { user_id } = req.params;
    const user_idSchema = joi_1.default.string()
        .pattern(new RegExp('^[0-9a-fA-F]{24}$'))
        .required();
    const validationResult = user_idSchema.validate(user_id);
    if (validationResult.error) {
        return res
            .status(400)
            .json({ error: `${validationResult.error.details[0].message},` });
    }
    next();
}
exports.validateUserId = validateUserId;
// validate script id
function validateScriptId(req, res, next) {
    const { script_id } = req.params;
    const user_idSchema = joi_1.default.string()
        .pattern(new RegExp('^[0-9a-fA-F]{24}$'))
        .required();
    const validationResult = user_idSchema.validate(script_id);
    if (validationResult.error) {
        return res
            .status(400)
            .json({ error: `${validationResult.error.details[0].message},` });
    }
    next();
}
exports.validateScriptId = validateScriptId;
//Validate User Id And  Script Id
function validateScriptAndUserId(req, res, next) {
    const { user_id } = req.params;
    const { script_id } = req.body;
    const script_idSchema = joi_1.default.object({
        user_id: joi_1.default.string().pattern(new RegExp('^[0-9a-fA-F]{24}$')).required(),
        script_id: joi_1.default.string().pattern(new RegExp('^[0-9a-fA-F]{24}$')).required(),
    });
    const validationResult = script_idSchema.validate({ user_id, script_id });
    if (validationResult.error) {
        return res
            .status(400)
            .json({ error: `${validationResult.error.details[0].message},` });
    }
    next();
}
exports.validateScriptAndUserId = validateScriptAndUserId;
//Validate User Id , Script Id And Script Title
function validateScriptTitle(req, res, next) {
    const { user_id } = req.params;
    const { script_id, title } = req.body;
    const script_idSchema = joi_1.default.object({
        user_id: joi_1.default.string().pattern(new RegExp('^[0-9a-fA-F]{24}$')).required(),
        script_id: joi_1.default.string().pattern(new RegExp('^[0-9a-fA-F]{24}$')).required(),
        title: joi_1.default.string().required(),
    });
    const validationResult = script_idSchema.validate({
        user_id,
        script_id,
        title,
    });
    if (validationResult.error) {
        return res
            .status(400)
            .json({ error: `${validationResult.error.details[0].message},` });
    }
    next();
}
exports.validateScriptTitle = validateScriptTitle;
//Validate User Id And Array Of Script Ids
function validateScriptIds(req, res, next) {
    const { user_id } = req.params;
    const { scriptIds } = req.body;
    const script_idSchema = joi_1.default.object({
        user_id: joi_1.default.string().pattern(new RegExp('^[0-9a-fA-F]{24}$')).required(),
        scriptIds: joi_1.default.array()
            .items(joi_1.default.string().pattern(new RegExp('^[0-9a-fA-F]{24}$')))
            .required(),
    });
    const validationResult = script_idSchema.validate({ user_id, scriptIds });
    if (validationResult.error) {
        return res
            .status(400)
            .json({ error: `${validationResult.error.details[0].message},` });
    }
    next();
}
exports.validateScriptIds = validateScriptIds;
function validateScriptData(req, res, next) {
    const { user_id } = req.params;
    const scripts = req.body.scripts;
    const ScriptSchema = joi_1.default.object({
        _id: joi_1.default.string().required(),
        title: joi_1.default.string().default('undefined'),
        isStarred: joi_1.default.boolean().default(false),
        isTrashed: joi_1.default.boolean().default(false),
        isDeleted: joi_1.default.boolean().default(false),
        user_id: joi_1.default.string().pattern(new RegExp('^[0-9a-fA-F]{24}$')).required(),
        created_at: joi_1.default.date().required(),
        updated_at: joi_1.default.date().required(),
        __v: joi_1.default.number().required(),
    });
    const schema = joi_1.default.array().items(ScriptSchema);
    const validationResult = schema.validate(scripts);
    if (validationResult.error) {
        return res
            .status(400)
            .json({ error: `${validationResult.error.details[0].message} sam` });
    }
    const userIdValidationResult = joi_1.default.string()
        .pattern(new RegExp('^[0-9a-fA-F]{24}$'))
        .validate(user_id);
    if (userIdValidationResult.error) {
        return res
            .status(400)
            .json({ error: userIdValidationResult.error.details[0].message });
    }
    next();
}
exports.validateScriptData = validateScriptData;
//# sourceMappingURL=scriptValidator.js.map