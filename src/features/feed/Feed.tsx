import react from 'react';

import {Post} from '../post/Post';

import styles from './Feed.module.scss';

export function Feed() {
  return (
    <div className={ styles.feed + " d-flex flex-column" }>
      <Post />
      <Post />
      <Post />
      <Post />
    </div>
  )
}