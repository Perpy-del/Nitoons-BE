"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const development_1 = require("./development");
const production_1 = require("./production");
const environment = process.env.NODE_ENV;
let config;
if (!environment)
    throw new Error('No environment setup');
console.log(`server setup to ${environment}!!!👨‍💻`);
if (environment.trim() === 'development') {
    exports.config = config = { ...development_1.development };
}
else {
    exports.config = config = { ...production_1.production };
}
//# sourceMappingURL=index.js.map