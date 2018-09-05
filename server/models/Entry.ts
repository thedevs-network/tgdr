import { Document, model, Model, Schema } from 'mongoose';

export interface IEntryModel extends Document {
  category: string;
  created_at: Date;
  description: string;
  dislikes: number;
  likes: number;
  members?: number;
  ratio: number;
  rejectReason?: string;
  status: number;
  telegram_id?: number;
  title: string;
  type: number;
  username: string;
}

const entrySchema: Schema = new Schema({
  category: { type: String, required: true },
  created_at: { type: Date, required: true, default: () => new Date() },
  description: {
    maxlength: 800,
    minlength: 20,
    required: true,
    trim: true,
    type: String,
  },
  dislikes: { type: Number, required: true, default: 0 },
  likes: { type: Number, required: true, default: 0 },
  members: Number,
  ratio: { type: Number, required: true, default: 0 },
  rejectReason: String,
  status: { type: Number, required: true, default: 1, min: 0, max: 2 },
  telegram_id: { type: Number },
  title: {
    maxlength: 54,
    minlength: 3,
    required: true,
    trim: true,
    type: String,
  },
  type: { type: Number, required: true, min: 0, max: 2 },
  username: {
    index: true,
    lowercase: true,
    required: true,
    trim: true,
    type: String,
  },
});

entrySchema.pre<IEntryModel>('save', function(next) {
  this.ratio = Math.round((this.likes / (this.likes + this.dislikes)) * 100);
  next();
});

const Entry: Model<IEntryModel> = model<IEntryModel>('Entry', entrySchema);

export default Entry;
