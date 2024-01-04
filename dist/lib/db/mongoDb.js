"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectMongoDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const index_1 = require("../../config/index");
const connectMongoDB = async () => {
    let connection;
    try {
        connection = await mongoose_1.default.connect(index_1.config.dbUrl);
        return connection;
    }
    catch (err) {
        console.log(err.message);
    }
};
exports.connectMongoDB = connectMongoDB;
//# sourceMappingURL=mongoDb.js.map