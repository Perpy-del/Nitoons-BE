"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const moment_1 = __importDefault(require("moment"));
class UserPinController {
    /**
     * Handles generating five digit token
     */
    static generatePin(expiryInMins) {
        const randomPin = crypto_1.default.randomInt(10000, 99999);
        const dateNow = (0, moment_1.default)();
        const expiryTime = (0, moment_1.default)(dateNow).add(expiryInMins, 'minutes').toDate();
        return { randomPin, expiryTime };
    }
    static checkIfPinIsExpired(expiryTime) {
        const dateNow = (0, moment_1.default)();
        const pinExpired = dateNow.isAfter(expiryTime);
        return pinExpired;
    }
}
exports.default = UserPinController;
//# sourceMappingURL=generateRandomPin.js.map