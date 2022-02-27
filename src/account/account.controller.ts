import { Irequest } from 'global';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { User } from 'src/users/models/user.schema';
import { AccountService } from './account.service';
import { AuthenticatedGuard } from 'src/guards/authenticated.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
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
  @Get('authors')
  async getAuthors(): Promise<User[]> {
    const admins = await this.accountService.getAdmins();
    admins.forEach((admin) => {
      admin.email = undefined;
      admin.password = undefined;
    });
    return admins;
  }
  @UseGuards(AuthenticatedGuard)
  @Post('avatar')
  @UseInterceptors(FilesInterceptor('avatar'))
  async uploadAvatar(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Irequest,
  ): Promise<any> {
    if (!file.mimetype.includes('image')) return HttpStatus.BAD_REQUEST;
    return this.accountService.uploadAvatar(file, req);
  }
  @UseGuards(AuthenticatedGuard)
  @Get('avatar')
  async getAvatar(@Req() req: Irequest): Promise<any> {
    return this.accountService.getAvatar(req);
  }
}
