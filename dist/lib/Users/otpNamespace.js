"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const otpModel_1 = __importDefault(require("../Users/models/otpModel"));
class PinNamespace {
    static async addNewPin(otpDetails) {
        return otpModel_1.default.create({
            otp: otpDetails.otp,
            user_id: otpDetails.userId,
            is_used: otpDetails.isUsed,
            expiry_time: otpDetails.expiryTime,
        });
    }
    static async getPin(otpDetails) {
        return otpModel_1.default.findOne({ user_id: otpDetails.userId, otp: otpDetails.otp });
    }
    static async getPinIsUsed(otpDetails) {
        return otpModel_1.default.findOne({
            user_id: otpDetails.userId,
            otp: otpDetails.otp,
            is_used: true,
        });
    }
    static async updatePinIsUsed(otpDetails) {
        return otpModel_1.default.findOneAndUpdate({
            user_id: otpDetails.userId,
            otp: otpDetails.otp,
        }, {
            is_used: true,
        }, { new: true });
    }
}
exports.default = PinNamespace;
//# sourceMappingURL=otpNamespace.js.map