import { Schema, model, Document, Types } from 'mongoose'

export interface Register extends Document{
  email: string;
  password: string;
  name: string;
}
const schema: Schema = new Schema({
  from:{ type: String, required: true },
  to: { type: String, required: true, unique: true },
  code: { type: String, required: true, unique: true },
  date: { type: Date, default: Date.now },
  clicks: { tpye: Number, default: 0 },
  owner: { type: Types.ObjectId, ref: 'User'}
})

export default model<Register>('Link', schema)