"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { Types } from 'joi'
const mongoose_1 = require("mongoose");
const ParagraphSchema = new mongoose_1.Schema({
    chapter_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'chapter',
    },
    content: {
        type: String,
        required: true,
    },
    deleted: {
        type: Boolean,
        default: false,
    },
});
const ParagraphModel = (0, mongoose_1.model)('paragraph', ParagraphSchema);
exports.default = ParagraphModel;
//# sourceMappingURL=ParagraphModel.js.map