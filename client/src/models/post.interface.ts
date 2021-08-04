import { IReport } from "./report.interface";
import { IUserPublic } from "./user.interface";

export interface IPost {
  _id: string,
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

export interface IPostUser {
  userId: string,
  postId: string,
}

export interface IPostLikes extends IReport {
  likes: number,
}
