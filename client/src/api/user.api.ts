import { requests } from './api';
import { IUser, IUserDeletion, IUserProfileInfo, IUserToken } from '../models/user.interface';

export const UserRequest = {
  getUsers: (): Promise<IUser[]> => requests.get('user/users'),
  getUser: (email: String): Promise<IUserProfileInfo> => requests.get('user/byEmail/' + email),
  getUserProfile: (id: string): Promise<IUserProfileInfo> => requests.get('user/byId/' + id),
  createUser: (user: IUser): Promise<IUserToken> =>
    requests.post('user/create', user),
  loginUser: (user: IUser): Promise<IUserToken> => requests.post('user/login', user),
  deleteUser: (id: string): Promise<IUserDeletion> => requests.delete('user/delete/' + id),
};
