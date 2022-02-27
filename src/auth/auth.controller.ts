import { UnAuthenticatedGuard } from './../guards/unauthenticated.guard';
import { User } from './../users/models/user.schema';
import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { Irequest } from 'global';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthenticatedGuard } from 'src/guards/authenticated.guard';
@Controller('auth')
export class AuthController {
  @UseGuards(UnAuthenticatedGuard, LocalAuthGuard)
  @Post('login')
  getLogin(@Req() req: Irequest): any {
    return req.user;
  }
  @UseGuards(AuthenticatedGuard)
  @Post('signout')
  signOut(@Req() req: Request) {
    req.logout();
    req.session.destroy(() => null);
    return { message: 'Session Destroyed' };
  }
}
