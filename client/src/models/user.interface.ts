import { IPost } from "./post.interface";

export interface IUser {
  name: string;
  email: string;
  password: string;
}

export interface IUserPublic {
  _id: string;
  name: string;
}

export interface IUserUpdate {
  name: string;
  password: string;
}

export interface IUserProfileInfo {
  user: string,
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
