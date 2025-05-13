import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  username: string;
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.User ||
  mongoose.model<IUser>('User', userSchema);
