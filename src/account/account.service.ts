import { Irequest } from 'global';
import { HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/models/user.schema';
import { Request } from 'express';
@Injectable()
export class AccountService {
  constructor(private userService: UsersService) {}
  async signUp(body: User, req: Irequest): Promise<number | any> {
    if (!body.email || !body.password || !body.name)
      return HttpStatus.BAD_REQUEST;
    if (body.admin == null) {
      body.admin = false;
    }
    if ((!req.user || !req.user.admin) && body.admin == true)
      return HttpStatus.FORBIDDEN;
    body.id = await this.userService.makeUniqueId();
    body.createdAt = Date.now();
    const user = await this.userService.createUser(body);
    const { name, id, email } = user;
    return { name, id, email };
  }
  async getUser(req: Irequest) {
    const user = await this.userService.findUserById(req.user.id);
    const { name, id, email } = user;
    return { name, id, email };
  }
}
