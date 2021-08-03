import { requests } from './api';
import { IUser, IUserProfileInfo, IUserToken, IUserUpdate } from '../models/user.interface';
import { IReport } from '../models/report.interface';

export const UserRequest = {
  getUsers: (): Promise<IUser[]> => requests.get('user/users'),
  getUser: (email: String): Promise<IUserProfileInfo> => requests.get('user/byEmail/' + email),
  getUserProfile: (id: string): Promise<IUserProfileInfo> => requests.get('user/byId/' + id),
  createUser: (user: IUser): Promise<IUserToken> =>
    requests.post('user/create', user),
  loginUser: (user: IUser): Promise<IUserToken> => requests.post('user/login', user),
  deleteUser: (id: string): Promise<IReport> => requests.delete('user/delete/' + id),
  updateUser: (id: string, user: IUserUpdate): Promise<IReport> => requests.put('user/update/' + id, user),
};
