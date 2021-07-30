import react, { useEffect, useState } from 'react';
import { PostRequest } from '../../api/post.api';
import { IPost } from '../../models/post.interface';

import { Post } from '../post/Post';

import styles from './Feed.module.scss';

export function Feed() {
  const initialState: IPost[] = []
  const [posts, setPosts] = useState(initialState)
  useEffect(() => {
    PostRequest.getPosts()
      .then((data) => { setPosts(data.posts); console.log(data.posts) })
      .catch((err) => console.error(err))
  }, [])
  return (
    <div className={styles.feed + " d-flex flex-column align-items-center"}>
      {posts.map((post, idx) => {
        return <Post key={idx} post={post} />
      })}
    </div>
  )
}