import { requests } from './api';
import { IFeedPosts, IPost, IPostUser } from '../models/post.interface';
import { IReport } from '../models/report.interface';

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
  getLikes: (id: string): Promise<number> => requests.get('post/like/' + id),
  isLiked: (postUser: IPostUser): Promise<IReport> => requests.post('post/isLiked', postUser),
  like: (postUser: IPostUser): Promise<IReport> => requests.post('post/like', postUser),
  unlike: (postUser: IPostUser): Promise<IReport> => requests.post('post/unlike', postUser),
}
