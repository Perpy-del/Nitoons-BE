"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allChaptersValidator = exports.chapterValidator = exports.updateChapterValidator = exports.addChapterValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const addChapterValidator = (req, _res, next) => {
    const validateNewChapter = joi_1.default.object({
        script_id: joi_1.default.string()
            .regex(/^[0-9a-fA-F]{24}$/)
            .required()
            .messages({
            'string.pattern.base': 'Invalid script id',
        }),
    });
    const { error } = validateNewChapter.validate(req.body);
    if (error) {
        console.log(error);
        throw error;
    }
    next();
};
exports.addChapterValidator = addChapterValidator;
const updateChapterValidator = (req, res, next) => {
    const { script_id } = req.params;
    const { chapter_id, title, content } = req.body;
    const validateUpdateChapter = joi_1.default.object({
        script_id: joi_1.default.string()
            .regex(/^[0-9a-fA-F]{24}$/)
            .required()
            .messages({
            'string.pattern.base': 'Invalid script id',
        }),
        chapter_id: joi_1.default.string()
            .regex(/^[0-9a-fA-F]{24}$/)
            .required()
            .messages({
            'string.pattern.base': 'Invalid chapter id',
        }),
        title: joi_1.default.string().messages({
            'string.pattern.base': 'Please enter a valid title',
        }),
        content: joi_1.default.string().messages({
            'string.pattern.base': 'Please enter a valid content',
        }),
    });
    const { error } = validateUpdateChapter.validate({
        script_id,
        chapter_id,
        title,
        content,
    });
    if (error) {
        console.log(error);
        throw error;
    }
    next();
};
exports.updateChapterValidator = updateChapterValidator;
const chapterValidator = (req, res, next) => {
    const { script_id } = req.params;
    const { chapter_id } = req.body;
    const validateChapter = joi_1.default.object({
        script_id: joi_1.default.string()
            .regex(/^[0-9a-fA-F]{24}$/)
            .required()
            .messages({
            'string.pattern.base': 'Invalid script id',
        }),
        chapter_id: joi_1.default.string()
            .regex(/^[0-9a-fA-F]{24}$/)
            .required()
            .messages({
            'string.pattern.base': 'Invalid chapter id',
        }),
    });
    const { error } = validateChapter.validate({ script_id, chapter_id });
    if (error) {
        console.log(error);
        throw error;
    }
    next();
};
exports.chapterValidator = chapterValidator;
const allChaptersValidator = (req, res, next) => {
    const { script_id } = req.params;
    const validateChaptersInScript = joi_1.default.object({
        script_id: joi_1.default.string()
            .regex(/^[0-9a-fA-F]{24}$/)
            .required()
            .messages({
            'string.pattern.base': 'Invalid script id',
        }),
    });
    const { error } = validateChaptersInScript.validate({ script_id });
    if (error) {
        console.log(error);
        throw error;
    }
    next();
};
exports.allChaptersValidator = allChaptersValidator;
//# sourceMappingURL=chapterValidator.js.map