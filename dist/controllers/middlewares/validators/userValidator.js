"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatorNamespace = void 0;
const joi_1 = __importDefault(require("joi"));
const emailValidator = (req, res, next) => {
    const validateEmail = joi_1.default.object({
        email: joi_1.default.string()
            .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
            .required()
            .messages({
            'string.pattern.base': 'Not a valid email address. Please input a valid email address.',
        }),
    });
    const { error } = validateEmail.validate(req.body);
    if (error) {
        console.log(error);
        throw error;
    }
    next();
};
const pinValidator = (req, res, next) => {
    const validatePin = joi_1.default.object({
        otp: joi_1.default.number().required().messages({
            'string.pattern.base': 'Please enter a valid pin number',
        }),
        user_id: joi_1.default.string()
            .regex(/^[0-9a-fA-F]{24}$/)
            .required()
            .messages({
            'string.pattern.base': 'Invalid user id',
        }),
    });
    const { error } = validatePin.validate(req.body);
    if (error) {
        console.log(error);
        throw error;
    }
    next();
};
exports.validatorNamespace = {
    emailValidator,
    pinValidator,
};
//# sourceMappingURL=userValidator.js.map