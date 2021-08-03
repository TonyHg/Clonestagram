import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faImage, faUser } from '@fortawesome/free-regular-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { UserRequest } from '../../api/user.api';
import { RootState } from '../../app/store';

import testImg from '../../assets/img/image 1.png';
import testIcon from '../../assets/img/image 2.png';
import { IPost } from '../../models/post.interface';
import { IUser, IUserProfileInfo } from '../../models/user.interface';

import styles from './Profile.module.scss';

export function Profile() {
  const initialState: IUserProfileInfo = { user: "", posts: [] }
  const [user, setUser] = useState(initialState)
  const userId = useSelector((state: RootState) => state.profile.userId)
  useEffect(() => {
    UserRequest.getUserProfile(userId).then((data) => {
      console.log(data)
      const userProfileInfo: IUserProfileInfo = { user: data.user || "no name", posts: data.posts || [] }
      setUser(userProfileInfo)
    }).catch((err) => console.log(err))
  }, [userId])

  return (
    <div className={styles.profile + " d-flex"}>
      <UserInfo user={user} />
      <Portfolio posts={user.posts} />
    </div>
  )
}

function UserInfo(props: { user: IUserProfileInfo }) {
  return (
    <div className={styles.userInfo + " col-3 d-flex flex-column align-items-center"}>
      <div className={styles.userInfoImg}>
        <img src={testIcon} />
      </div>
      <div className={styles.userInfoName + " my-3"}>
        {props.user.user}
      </div>
      <UserInfoStat icon={faUser} val={42} name="Followers" />
      <UserInfoStat icon={faUsers} val={512} name="Following" />
      <UserInfoStat icon={faImage} val={props.user.posts.length} name="Post" />
      <UserActions />
    </div>
  )
}

interface UserInfoStatProp {
  icon: IconProp,
  val: Number,
  name: String
}

function UserInfoStat({ icon, val, name }: UserInfoStatProp) {
  return (
    <div className={styles.userInfoStat + " d-flex justify-content-center align-items-center"}>
      <FontAwesomeIcon icon={icon} className={styles.userInfoStatIcon} size="lg" />
      <div className={styles.userInfoStatVal + " mx-2"}>{val}</div>
      <div className={styles.userInfoStatName}>{name}</div>
    </div>
  )
}

function UserActions() {
  return (
    <div className={styles.userInfoActions + " d-flex flex-column"}>
      <div className={styles.userInfoActionsPrimary + " mb-2 mt-5"}>
        Follow
      </div>
      <div className={styles.userInfoActionsSecondary}>
        Message
      </div>
    </div>
  )
}

function Portfolio(props: { posts: IPost[] }) {
  return (
    <div className={styles.portfolio + " col-9 d-flex flex-wrap"}>
      {props.posts.length === 0 && <EmptyPortfolio /> || props.posts.map((post, idx) => <PortfolioItem key={idx} post={post} />)}
    </div>
  )
}

function PortfolioItem(props: { post: IPost }) {
  return (
    <div className={styles.portfolioItem + " mb-5"}>
      <div className={styles.portfolioItemMedia}>
        <img src={'http://localhost:2048/api/file/file/' + props.post.filename} />
      </div>
      <div className={styles.portfolioItemDescription + " py-1 px-3"}>
        {props.post.description}
      </div>
    </div>
  )
}

function EmptyPortfolio() {
  return (
    <div className={styles.emptyPortfolio}>
      No posts yet
    </div>
  )
}