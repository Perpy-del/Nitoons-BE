import { Schema, model } from 'mongoose';

interface IUser {
  email: string;
}

export interface IUserSchema extends IUser, Document {}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      immutable: true,
      lowercase: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const UserModel = model<IUserSchema>('user', UserSchema);

export default UserModel;
