import otpModel, { IPin } from '../Users/models/otpModel'
import { Types } from 'mongoose'

export default class PinNamespace {
  public static async addNewPin(otpDetails: {
    otp: number
    userId: Types.ObjectId
    isUsed?: boolean
    expiryTime: Date
  }): Promise<IPin> {
    return otpModel.create({
      otp: otpDetails.otp,
      user_id: otpDetails.userId,
      is_used: otpDetails.isUsed,
      expiry_time: otpDetails.expiryTime,
    })
  }

  public static async getPin(otpDetails: {
    userId: Types.ObjectId
    otp: number
  }): Promise<IPin> {
    return otpModel.findOne({ user_id: otpDetails.userId, otp: otpDetails.otp })
  }

  public static async getPinIsUsed(otpDetails: {
    userId: Types.ObjectId
    otp: number
  }): Promise<IPin> {
    return otpModel.findOne({
      user_id: otpDetails.userId,
      otp: otpDetails.otp,
      is_used: true,
    })
  }

  public static async updatePinIsUsed(otpDetails: {
    otp: number
    userId: Types.ObjectId
  }): Promise<IPin> {
    return otpModel.findOneAndUpdate(
      {
        user_id: otpDetails.userId,
        otp: otpDetails.otp,
      },
      {
        is_used: true,
      },
      { new: true },
    )
  }
}
