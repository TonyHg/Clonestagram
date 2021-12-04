import react, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PostRequest } from '../../api/post.api';
import { UserRequest } from '../../api/user.api';
import { RootState } from '../../app/store';
import { IPost, IPostWithUser } from '../../models/post.interface';
import { IUserPublic } from '../../models/user.interface';
import emptyAvatar from '../../assets/img/image 2.png';
import { IMG_URL } from '../../api/api';

import { Post } from '../post/Post';

import styles from './Feed.module.scss';
import { UserActions } from '../profile/Profile';
import { setUser } from '../profile/profileSlice';
import { switchView, views } from '../../appSlice';

export function Feed() {
  const initialState: IPostWithUser[] = []
  const [posts, setPosts] = useState(initialState)
  const userId = useSelector((state: RootState) => state.auth.token?._id)
  const loadPosts = () => {
    if (userId) {
      PostRequest.getFeed(userId)
        .then((data) => {
          if (data.status) setPosts(data.posts)
          else console.log(data)
        })
        .catch((err) => console.error(err))
    }
  }

  useEffect(() => {
    loadPosts()
  }, [userId])

  return (
    <div className={styles.feed + " d-flex flex-column align-items-center"}>
      {posts && posts.map((post, idx) => {
        return <Post key={idx} post={post} />
      })}
      {userId && <Suggestion userId={userId!} loadPosts={loadPosts} />}
    </div>
  )
}

function Suggestion(props: { userId: string, loadPosts: () => void }) {
  const [users, setUsers] = useState<IUserPublic[]>([])
  useEffect(() => {
    UserRequest.getSuggestion(props.userId)
      .then((data) => {
        console.log(data)
        if (data.status) setUsers(data.users)
      }).catch((err) => {
        console.log(err)
      })
  }, [])
  return (
    <div className={styles.suggestionWrapper}>
      <span className={styles.suggestionHeader}>
        Find other users of Clonestagram!
      </span>
      <div className={styles.suggestion + " d-flex justify-content-center"}>
        {users && users.map((u) => <UserSuggestion key={u._id} user={u} userId={props.userId} loadPosts={props.loadPosts} />)}
      </div>
    </div>
  )
}

function UserSuggestion(props: { user: IUserPublic, userId: string, loadPosts: () => void }) {
  const [avatar, setAvatar] = useState(emptyAvatar)
  useEffect(() => {
    if (props.user._id) {
      UserRequest.getAvatar(props.user._id)
        .then((data) => {
          if (data.status)
            setAvatar(IMG_URL + data.message)
        })
        .catch((err) => { })
    }
  }, [])

  const dispatch = useDispatch()

  const onClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    dispatch(setUser(props.user._id))
    dispatch(switchView(views.PROFILE))
  }
  return (
    <div className={styles.userSuggestion + " d-flex flex-column justify-content-center align-items-center"}>
      <div className={styles.userSuggestionAvatar} onClick={onClick}>
        <img src={avatar} />
      </div>
      <div className={styles.userSuggestionName}>
        {props.user.name}
      </div>
      <UserActions userId={props.userId} profileId={props.user._id} isDisabled={false} callback={props.loadPosts} />
    </div>
  )
}
