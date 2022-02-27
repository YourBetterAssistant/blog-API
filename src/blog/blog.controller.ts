import { Irequest } from './../../global.d';
import { AdminGuard } from './../guards/admin.guard';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/guards/authenticated.guard';
import { BlogService } from './blog.service';
import { Blog } from './models/blog.schema';

@Controller('blog')
export class BlogController {
  constructor(private blogService: BlogService) {}
  @Get('all')
  async getAll(): Promise<Blog[]> {
    const blogs = await this.blogService.listAll();
    return blogs;
  }
  @Get(':id')
  async getOne(id: string): Promise<Blog> {
    return await this.blogService.getById(id);
  }
  @UseGuards(AuthenticatedGuard, AdminGuard)
  @Post('create')
  async createOne(
    @Body() blog: Blog,
    @Req() req: Irequest,
  ): Promise<number | Blog> {
    blog.author = req.user.id;
    return await this.blogService.createPage(blog);
  }
}
