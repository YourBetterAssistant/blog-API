import * as mongoose from 'mongoose';

export const user = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  createdAt: Number,
  admin: Boolean,
  avatar: String,
  id: { type: String, unique: true },
});
export class User {
  constructor(
    public name: string,
    public email: string,
    public password: string,
    public createdAt: number,
    public admin: boolean,
    public avatar: string,
    public id: string,
  ) {}
}
