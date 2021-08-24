import { requests } from './api';
import { IFeedPosts, IPost, IPostComment, IPostComments, IPostStatus, IPostLikes, IPostUser } from '../models/post.interface';
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
  getFeed: (id: string): Promise<IFeedPosts> => requests.get('post/feed/' + id),
  getPosts: (): Promise<IFeedPosts> => requests.get('post/getAll'),
  getPost: (id: string): Promise<IPostStatus> => requests.get('post/' + id),
  getLikes: (id: string): Promise<IPostLikes> => requests.get('post/like/' + id),
  isLiked: (postUser: IPostUser): Promise<IReport> => requests.post('post/isLiked', postUser),
  like: (postUser: IPostUser): Promise<IReport> => requests.post('post/like', postUser),
  unlike: (postUser: IPostUser): Promise<IReport> => requests.post('post/unlike', postUser),
  getComments: (id: string): Promise<IPostComments> => requests.get('post/comments/' + id),
  comment: (comment: IPostComment): Promise<IReport> => requests.post('post/comment', comment),
  uncomment: (id: string): Promise<IReport> => requests.delete('post/uncomment/' + id),
}
