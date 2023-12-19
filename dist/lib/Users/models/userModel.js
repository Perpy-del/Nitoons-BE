"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        immutable: true,
        lowercase: true,
        trim: true,
    },
}, { timestamps: true });
const UserModel = (0, mongoose_1.model)('user', UserSchema);
exports.default = UserModel;
//# sourceMappingURL=userModel.js.map