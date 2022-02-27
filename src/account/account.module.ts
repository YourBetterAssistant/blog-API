import { UsersModule } from './../users/users.module';
import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { AuthenticatedGuard } from 'src/guards/authenticated.guard';

@Module({
  imports: [UsersModule],
  controllers: [AccountController],
  providers: [AccountService, AuthenticatedGuard],
})
export class AccountModule {}
