import { IPost } from "./post.interface";
import { IReport } from "./report.interface";

export interface IUser {
  name: string;
  email: string;
  password: string;
}

export interface IUserPublic {
  _id: string;
  name: string;
  followers: number;
  following: number;
}

export interface IUserUpdate {
  name: string;
  password: string;
}

export interface IUserProfileInfo {
  user: IUserPublic,
  posts: IPost[]
}

export interface IUserToken {
  _id: string,
  name: string,
  email: string,
  token: string,
}

export interface IUserAvatar {
  userId: string,
  file: File | null,
  filename: string,
}

export interface IFollow {
  userId: string,
  followerId: string,
}

export interface ISearch extends IReport {
  users: IUserPublic[]
}
