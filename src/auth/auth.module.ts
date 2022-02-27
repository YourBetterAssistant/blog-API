import { UnAuthenticatedGuard } from './../guards/unauthenticated.guard';
import { UsersModule } from './../users/users.module';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { LocalAuthGuard } from './local-auth.guard';
import { SessionSerializer } from 'src/serializers/session.serializer';
import { PassportModule } from '@nestjs/passport';
@Module({
  imports: [UsersModule, PassportModule.register({ session: true })],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    LocalAuthGuard,
    SessionSerializer,
    UnAuthenticatedGuard,
  ],
})
export class AuthModule {}
