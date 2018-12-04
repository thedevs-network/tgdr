import { Document, model, Model, Schema } from 'mongoose';

export interface IUserModel extends Document {
  banned: boolean;
  commanding: boolean;
  created_at: Date;
  dislikes: number;
  first_name: string;
  last_name: string;
  likes: number;
  reviewing?: boolean;
  spamReportDate: Date;
  telegram_id: number;
  username?: string;
}

const userSchema: Schema = new Schema({
  banned: { type: Boolean },
  commanding: { type: Boolean },
  created_at: { type: Date, required: true, default: Date.now },
  dislikes: { Type: Number, default: 0 },
  first_name: { type: String, required: true, maxlength: 32 },
  last_name: { type: String, maxlength: 32 },
  likes: { Type: Number, default: 0 },
  reviewing: { type: Boolean },
  spamReportDate: { Type: Date },
  telegram_id: { type: Number, required: true, index: true },
  username: { type: String, lowercase: true, trim: true },
});

const User: Model<IUserModel> = model<IUserModel>('User', userSchema);

export default User;
