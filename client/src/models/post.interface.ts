import { IUser } from "./user.interface";

export interface IPost {
  userId: string,
  file: File | null,
  filename: string,
  description: string,
  uploadDate: string,
}

export interface IPostWithUser {
  user: IUser,
  file: File | null,
  filename: string,
  description: string,
  uploadDate: string,
}

export interface IFeedPosts {
  posts: IPostWithUser[]
}