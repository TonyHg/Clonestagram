import { requests } from './api';
import { User } from '../models/user.interface';

export const UserRequest = {
  getUsers: (): Promise<User[]> => requests.get('user/users'),
  createUser: (user: User): Promise<User> =>
    requests.post('user/create', user),
  loginUser: (user: User): Promise<User> => requests.post('user/login', user),
};
