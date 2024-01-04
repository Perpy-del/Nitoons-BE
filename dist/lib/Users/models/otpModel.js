"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const otpSchema = new mongoose_1.Schema({
    user_id: {
        type: mongoose_1.SchemaTypes.ObjectId,
        required: true,
        ref: 'user',
    },
    otp: {
        type: Number,
        required: true,
    },
    is_used: {
        type: Boolean,
        default: false,
    },
    expiry_time: {
        type: Date,
    },
}, { timestamps: true });
const otpModel = (0, mongoose_1.model)('otp', otpSchema);
exports.default = otpModel;
//# sourceMappingURL=otpModel.js.map