import { requests } from './api';
import { Post } from '../models/post.interface';

export const PostRequest = {
  createPost: (post: Post): Promise<Post> => requests.post('post/create', post),
}