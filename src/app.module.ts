import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';
import { UsersModule } from './users/users.module';
import { AccountModule } from './account/account.module';
import { BlogModule } from './blog/blog.module';
config();
@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot(process.env.MONGODB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    UsersModule,
    AccountModule,
    BlogModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
