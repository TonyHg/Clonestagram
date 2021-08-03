import { IPost } from "./post.interface";

export interface IUser {
  name: string;
  email: string;
  password: string;
}

export interface IUserProfileInfo {
  user: string,
  posts: IPost[]
}

export interface IUserToken {
  _id: string,
  email: string,
  token: string,
}

export interface IUserDeletion {
  status: boolean,
  message: string,
}