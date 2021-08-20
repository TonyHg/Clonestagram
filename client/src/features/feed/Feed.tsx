import react, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { PostRequest } from '../../api/post.api';
import { RootState } from '../../app/store';
import { IPost, IPostWithUser } from '../../models/post.interface';

import { Post } from '../post/Post';

import styles from './Feed.module.scss';

export function Feed() {
  const initialState: IPostWithUser[] = []
  const [posts, setPosts] = useState(initialState)
  const userId = useSelector((state: RootState) => state.auth.token?._id)
  useEffect(() => {
    if (userId) {
      PostRequest.getFeed(userId)
        .then((data) => {
          if (data.status) setPosts(data.posts)
          else console.log(data)
        })
        .catch((err) => console.error(err))
    }
  }, [userId])
  return (
    <div className={styles.feed + " d-flex flex-column align-items-center"}>
      {posts && posts.map((post, idx) => {
        return <Post key={idx} post={post} />
      })}
    </div>
  )
}
