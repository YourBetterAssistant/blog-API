import { Request } from 'express';
import { User } from 'src/users/models/user.schema';

export interface Irequest extends Request {
  user: User;
}
