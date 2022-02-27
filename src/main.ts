import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import * as session from 'express-session';
import * as compression from 'compression';
import * as passport from 'passport';
import { createClient } from 'redis';
import * as connectRedis from 'connect-redis';
config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const redis = createClient({
    url: process.env.REDIS,
    legacyMode: true,
  });
  redis.connect().then(() => console.log('Redis Conencted'));
  const RedisStore = connectRedis(session);
  app.use(
    session({
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
      },
      store: new RedisStore({
        client: redis,
      }),
    }),
  );
  app.use(compression());
  app.enableCors({
    origin: true,
  });
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(process.env.PORT || 3000).then(() => {
    console.log(`Server running on port ${process.env.PORT || 3000}`);
  });
}
bootstrap();
