import { UsersService } from 'src/users/users.service';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Blog } from './models/blog.schema';
import { Model } from 'mongoose';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel('Blogs') private blog: Model<Blog>,
    private userService: UsersService,
  ) {}
  async listAll(): Promise<Blog[]> {
    return await this.blog.find();
  }
  async getById(id: string): Promise<Blog> {
    return await this.blog.findOne({ id });
  }
  async getByName(name: string): Promise<Blog[]> {
    return await this.blog.find({ name });
  }
  async getByAuthor(authorId: string): Promise<Blog[]> {
    return await this.blog.find({ author: authorId });
  }
  async createPage(blog: Blog): Promise<Blog | number> {
    if (!blog.body || !blog.description || !blog.title) return 400;
    blog.id = await this.userService.makeUniqueId();
    blog.date = Date.now();
    const newBlog = new this.blog(blog);
    return await newBlog.save();
  }
}
