import { requests } from './api';
import { Post } from '../models/post.interface';

export const PostRequest = {
  createPost: (post: Post): Promise<Post> => {
    const formData = new FormData()
    formData.append("description", post.description)
    formData.append("uploadDate", post.uploadDate)
    formData.append("userId", post.userId)
    formData.append("file", post.file!, post.file?.name)
    return requests.postFile('post/create', formData)
  },
}