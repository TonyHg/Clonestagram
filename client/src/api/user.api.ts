import { requests } from './api';
import { User, UserProfileInfo, UserToken } from '../models/user.interface';

export const UserRequest = {
  getUsers: (): Promise<User[]> => requests.get('user/users'),
  getUser: (email: String): Promise<UserProfileInfo> => requests.get('user/byEmail/' + email),
  createUser: (user: User): Promise<UserToken> =>
    requests.post('user/create', user),
  loginUser: (user: User): Promise<UserToken> => requests.post('user/login', user),
};
