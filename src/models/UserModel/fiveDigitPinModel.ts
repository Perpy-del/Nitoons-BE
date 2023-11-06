import { Schema, SchemaTypes, model, Types } from "mongoose";
import moment from "moment";

interface IFiveDigitPin {
    user_id: Types.ObjectId;
    five_digit_pin: number;
    is_used: boolean;
    expiry_time: Date;
}

interface IFiveDigitPinSchema extends IFiveDigitPin, Document {}

const FiveDigitPinSchema: Schema = new Schema(
    {
        user_id: {
            type: SchemaTypes.ObjectId,
            required: true,
            ref: "user"
        },
        five_digit_pin: {
            type: Number,
            required: true,
        },
        is_used: {
            type: Boolean,
            default: false,
        },
        expiry_time: {
            type: Date,
        }
    },
    { timestamps: true }
);

const fiveDigitPinModel = model<IFiveDigitPinSchema>("fiveDigitPin", FiveDigitPinSchema)

export default fiveDigitPinModel;