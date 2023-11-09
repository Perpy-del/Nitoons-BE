import otpModel from '../../models/UserModel/otpModel';
import { Types } from 'mongoose';

const addNewPin = async (props: {
  otp: number;
  userId: Types.ObjectId;
  isUsed?: boolean;
  expiryTime: Date;
}) => {
  return otpModel.create({
    otp: props.otp,
    user_id: props.userId,
    is_used: props.isUsed,
    expiry_time: props.expiryTime,
  });
};

const getPin = async (props: {
  userId: Types.ObjectId;
  otp: number;
}) => {
   return otpModel.findOne({user_id: props.userId, otp: props.otp})
};

const getPinIsUsed = async(props: {
  userId: Types.ObjectId;
  otp: number;
}) => {
  return otpModel.findOne({user_id: props.userId, otp: props.otp, is_used: true})
}

const updatePinIsUsed = async (props: {
  otp: number;
  userId: Types.ObjectId;
}) => {
  return otpModel.findOneAndUpdate(
    { 
      user_id: props.userId, 
      otp: props.otp
    },
    {
      is_used: true,
    },
    { new: true }
  );
};


export const otpNamespace = {
  addNewPin,
  getPin,
  updatePinIsUsed,
  getPinIsUsed
};
