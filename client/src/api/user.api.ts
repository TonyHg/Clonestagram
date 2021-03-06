import { requests } from './api';
import { IFollow, ISearch, IUser, IUserAvatar, IUserProfileInfo, IUserToken, IUserUpdate } from '../models/user.interface';
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
  setAvatar: (avatar: IUserAvatar): Promise<IReport> => {
    const formData = new FormData()
    formData.append("userId", avatar.userId)
    formData.append("file", avatar.file!, avatar.file?.name)
    formData.append("filename", avatar.filename)
    return requests.postFile('user/avatar', formData)
  },
  getAvatar: (id: string): Promise<IReport> => requests.get('user/avatar/' + id),
  follow: (follow: IFollow): Promise<IReport> => requests.post('user/follow/', follow),
  unfollow: (follow: IFollow): Promise<IReport> => requests.post('user/unfollow/', follow),
  isFollowing: (follow: IFollow): Promise<IReport> => requests.post('user/isFollowing/', follow),
  getSuggestion: (id: string): Promise<ISearch> => requests.get('user/suggestion/' + id),
  search: (query: string): Promise<ISearch> => requests.get('user/search/' + query),
};
