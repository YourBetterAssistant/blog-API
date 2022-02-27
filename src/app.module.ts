import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';
config();
@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot(process.env.MONGODB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
