import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}
  async validateUser(id: string, password: string) {
    const user = await this.userService.findUserById(id);
    if (!user) return null;
    const hashed = await this.userService.oneWayHash(password);
    if (user.password === hashed) {
      user.password = undefined;
      return user;
    }
    return null;
  }
}
