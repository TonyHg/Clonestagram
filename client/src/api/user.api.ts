import { requests } from './api';
import { User, UserProfileInfo } from '../models/user.interface';

export const UserRequest = {
  getUsers: (): Promise<User[]> => requests.get('user/users'),
  getUser: (email: String): Promise<UserProfileInfo> => requests.get('user/byEmail/' + email),
  createUser: (user: User): Promise<User> =>
    requests.post('user/create', user),
  loginUser: (user: User): Promise<User> => requests.post('user/login', user),
};
