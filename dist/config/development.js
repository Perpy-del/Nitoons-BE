"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.development = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.development = {
    port: process.env.PORT,
    dbUrl: process.env.DEV_DB_CONNECTION_URL,
    sendgridApiKey: process.env.DEV_SENDGRID_API_KEY,
    jwtSecret: process.env.DEV_JWT_ACCESS_TOKEN,
    sendgridSender: process.env.DEV_SENDER_EMAIL,
};
//# sourceMappingURL=development.js.map