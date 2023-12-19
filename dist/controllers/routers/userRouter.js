"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../userController/userController"));
const userValidator_1 = require("../middlewares/validators/userValidator");
const jwtHandler_1 = require("../middlewares/jwtHandler");
exports.router = express_1.default.Router();
exports.router.post('/create-user', userValidator_1.validatorNamespace.emailValidator, userController_1.default.loginUser);
exports.router.post('/validate-pin', userValidator_1.validatorNamespace.pinValidator, userController_1.default.validateUser);
exports.router.get('/protected', jwtHandler_1.authMiddleware, userController_1.default.protectedRoute);
//# sourceMappingURL=userRouter.js.map