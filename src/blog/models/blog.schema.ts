import mongoose from 'mongoose';
import { User } from 'src/users/models/user.schema';

export const blog = new mongoose.Schema({
  title: String,
  description: String,
  authorId: String,
  body: String,
  date: Number,
  id: String,
});

export class Blog {
  constructor(
    public title: string,
    public description: string,
    public authorId: string,
    public body: string,
    public date: number,
    public id: string,
    public authorObj?: User,
  ) {}
}
