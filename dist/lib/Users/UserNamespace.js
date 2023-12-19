"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = __importDefault(require("../Users/models/userModel"));
class UserNamespace {
    static async addAndLoginUser(userDetails) {
        return userModel_1.default.create({
            email: userDetails.email,
        });
    }
    static async getUser(userDetails) {
        return userModel_1.default.findOne({
            email: userDetails.email,
        });
    }
}
exports.default = UserNamespace;
//# sourceMappingURL=UserNamespace.js.map