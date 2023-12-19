"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ScriptSchema = new mongoose_1.Schema({
    title: { type: String, default: 'undefined' },
    isStarred: { type: Boolean, default: false },
    isTrashed: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    user_id: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'User' },
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});
const ScriptModel = (0, mongoose_1.model)('script', ScriptSchema);
exports.default = ScriptModel;
//# sourceMappingURL=ScriptModel.js.map