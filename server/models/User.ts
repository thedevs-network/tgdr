import { Document, model, Model, Schema } from 'mongoose';

export interface IUserModel extends Document {
  created_at: Date;
  first_name: string;
  telegram_id: number;
  username?: string;
}

const userSchema: Schema = new Schema({
  created_at: { type: Date, required: true, default: () => new Date() },
  first_name: { type: String, required: true, maxlength: 32 },
  telegram_id: { type: Number, required: true },
  username: { type: String, lowercase: true, trim: true }
});

const User: Model<IUserModel> = model<IUserModel>('User', userSchema);

export default User;