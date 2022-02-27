import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { user } from './models/user.schema';
@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: user }])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
