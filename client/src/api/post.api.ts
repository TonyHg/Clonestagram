import { requests } from './api';
import { IFeedPosts, IPost } from '../models/post.interface';

export const PostRequest = {
  createPost: (post: IPost): Promise<IPost> => {
    const formData = new FormData()
    formData.append("description", post.description)
    formData.append("uploadDate", post.uploadDate)
    formData.append("userId", post.userId)
    formData.append("file", post.file!, post.file?.name)
    formData.append("filename", post.filename)
    return requests.postFile('post/create', formData)
  },
  getPosts: (): Promise<IFeedPosts> => requests.get('post/getAll'),
}