import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import * as session from 'express-session';
import * as compression from 'compression';
config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
      },
    }),
  );
  app.use(compression());
  app.enableCors({
    origin: true,
  });
  await app.listen(process.env.PORT || 3000).then(() => {
    console.log(`Server running on port ${process.env.PORT || 3000}`);
  });
}
bootstrap();
