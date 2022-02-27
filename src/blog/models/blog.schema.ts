import mongoose from 'mongoose';

export const blog = new mongoose.Schema({
  title: String,
  description: String,
  author: String,
  body: String,
  date: Number,
  id: String,
});

export class Blog {
  constructor(
    public title: string,
    public description: string,
    public author: string,
    public body: string,
    public date: number,
    public id: string,
  ) {}
}
