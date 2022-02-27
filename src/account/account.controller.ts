import { Irequest } from 'global';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { User } from 'src/users/models/user.schema';
import { UsersService } from 'src/users/users.service';
import { AccountService } from './account.service';
import { AuthenticatedGuard } from 'src/guards/authenticated.guard';
type UserWithOutPass = {
  name: string;
  email: string;
  createdAt: number;
  admin: boolean;
  avatar: string;
  id: string;
};
@Controller('account')
export class AccountController {
  constructor(private accountService: AccountService) {}
  @Post('signup')
  async signUp(
    @Body() body: User,
    @Req() req: Irequest,
  ): Promise<UserWithOutPass | number> {
    return this.accountService.signUp(body, req);
  }
  @UseGuards(AuthenticatedGuard)
  @Get('user')
  async getUser(@Req() req: Irequest): Promise<any> {
    return this.accountService.getUser(req);
  }
}
