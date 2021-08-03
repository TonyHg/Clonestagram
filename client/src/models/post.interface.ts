import { IUserPublic } from "./user.interface";

export interface IPost {
  userId: string,
  file: File | null,
  filename: string,
  description: string,
  uploadDate: string,
}

export interface IPostWithUser {
  _id: string,
  user: IUserPublic,
  file: File | null,
  filename: string,
  description: string,
  uploadDate: string,
}

export interface IFeedPosts {
  posts: IPostWithUser[]
}