import fiveDigitPinModel from '../../models/UserModel/fiveDigitPinModel';
import { Types } from 'mongoose';

const addNewPin = async (props: {
  fiveDigitPin: number;
  userId: Types.ObjectId;
  isUsed?: boolean;
  expiryTime: Date;
}) => {
  return fiveDigitPinModel.create({
    five_digit_pin: props.fiveDigitPin,
    user_id: props.userId,
    is_used: props.isUsed,
    expiry_time: props.expiryTime,
  });
};

const getPin = async (props: {
  userId: Types.ObjectId;
}) => {
   return fiveDigitPinModel.find({user_id: props.userId})
};

const updatePin = async (props: {
  fiveDigitPin: number;
  userId: Types.ObjectId;
  isUsed?: boolean;
  expiryTime: Date;
}) => {
  return fiveDigitPinModel.findOneAndUpdate(
    { 
      user_id: props.userId 
    },
    {
      five_digit_pin: props.fiveDigitPin,
      is_used: props.isUsed,
      expiry_time: props.expiryTime,
    },
    { new: true }
  );
};


export const fiveDigitPinNamespace = {
  addNewPin,
  getPin,
  updatePin
};
