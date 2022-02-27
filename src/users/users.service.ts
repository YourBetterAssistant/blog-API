import { Injectable, Post } from '@nestjs/common';
import { User } from './models/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createHash } from 'crypto';
@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private user: Model<User>) {}
  async findAll(): Promise<User[]> {
    const user = await this.user.find();
    return user;
  }
  async findUserById(id: string): Promise<User> {
    const user = await this.user.findOne({ id });
    return user as User;
  }
  async findUserByAdmin(): Promise<User[]> {
    const user = await this.user.find({ admin: true });
    return user;
  }
  async createUser(user: User): Promise<User> {
    const hashed = await this.oneWayHash(user.password);
    user.password = hashed;
    const newUser = new this.user(user);
    return newUser.save();
  }
  async updateUser(id: string, user: any): Promise<any> {
    const updateUser = await this.user.updateOne({ id }, user, {
      new: true,
    });
    return updateUser;
  }
  async makeUniqueId(): Promise<string> {
    const id =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    if (await this.findUserById(id)) {
      return this.makeUniqueId();
    }
    return id;
  }
  async oneWayHash(input: string) {
    const hashed = createHash('sha512').update(input).digest('hex');
    return hashed;
  }
}
