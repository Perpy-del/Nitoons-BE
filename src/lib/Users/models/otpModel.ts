import { Schema, SchemaTypes, model, Types } from 'mongoose'
import moment from 'moment'

export interface IPin {
  user_id: Types.ObjectId
  otp: number
  is_used?: boolean
  expiry_time: Date
}

interface IPinSchema extends IPin, Document {}

const otpSchema: Schema = new Schema(
  {
    user_id: {
      type: SchemaTypes.ObjectId,
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
  },
  { timestamps: true },
)

const otpModel = model<IPinSchema>('otp', otpSchema)

export default otpModel
