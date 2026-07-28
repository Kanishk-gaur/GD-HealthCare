import { Schema, models, model } from 'mongoose'

export interface IUser {
  _id?: string
  email: string
  passwordHash: string
  name: string
  role: 'admin'
  createdAt?: Date
  updatedAt?: Date
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, enum: ['admin'], default: 'admin' },
  },
  { timestamps: true }
)

export const User = models.User || model<IUser>('User', UserSchema)

export default User