import { UsersModule } from './../users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { blog } from './models/blog.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Blogs', schema: blog }]),
    UsersModule,
  ],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}
