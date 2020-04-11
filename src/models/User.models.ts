import { Schema, model, Document, Types } from 'mongoose'

export interface Register extends Document{
  email: string;
  password: string;
  name: string;
}

const schema: Schema = new Schema({
  email:{ type: String, required: true, unique: true },
  password: { type: String, required: true },
  links: [ { type: Types.ObjectId, ref: 'Link' } ]
})

export default model<Register>('User', schema)