export interface IPost {
  userId: string,
  file: File | null,
  filename: string,
  description: string,
  uploadDate: string,
}

export interface IFeedPosts {
  posts: IPost[]
}