"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newToken = exports.authMiddleware = void 0;
const index_1 = require("../../config/index");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const responses_namespace_1 = __importDefault(require("../../utils/responses_namespace"));
dotenv_1.default.config();
function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    const generateToken = authHeader && authHeader.split(' ')[1];
    try {
        if (!generateToken) {
            responses_namespace_1.default.UnauthorizedError(res, 'Unauthorized. No token provided');
        }
        const payload = jsonwebtoken_1.default.verify(generateToken, index_1.config.jwtSecret);
        req.user = payload;
        next();
    }
    catch (error) {
        responses_namespace_1.default.UnauthorizedError(res, 'Access denied, invalid token');
    }
}
exports.authMiddleware = authMiddleware;
function newToken(user_id) {
    const payload = { userId: user_id };
    const token = jsonwebtoken_1.default.sign(payload, index_1.config.jwtSecret, {
        expiresIn: 2 * 60 * 60 * 24,
    });
    return token;
}
exports.newToken = newToken;
//# sourceMappingURL=jwtHandler.js.map