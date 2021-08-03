import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faImage, faUser } from '@fortawesome/free-regular-svg-icons';
import { faCheck, faPen, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UserRequest } from '../../api/user.api';
import { RootState } from '../../app/store';

import testImg from '../../assets/img/image 1.png';
import emptyAvatar from '../../assets/img/image 2.png';
import { IPost } from '../../models/post.interface';
import { IUser, IUserProfileInfo } from '../../models/user.interface';

import styles from './Profile.module.scss';
import btnStyles from '../styles/Button.module.scss';
import { setAvatar } from '../../appSlice';

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
      <UserInfo user={user} userId={userId} />
      <Portfolio posts={user.posts} />
    </div>
  )
}

function UserInfo(props: { user: IUserProfileInfo, userId: string }) {
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.auth.token?._id)
  const [userAvatar, setUserAvatar] = useState(emptyAvatar)

  const avatarInput = useRef<HTMLInputElement>(null)
  const [avatar, setAvatarFile] = useState<File>()
  const [preview, setPreview] = useState("")
  const onClick = () => {
    if (avatarInput.current)
      avatarInput.current.click()
  }

  const onChangeFile = (e: React.FormEvent<EventTarget>) => {
    let target = e.target as HTMLInputElement;
    setAvatarFile(target.files!![0])
    setPreview(URL.createObjectURL(target.files!![0]))
  }

  const onEdit = () => {
    const userAvatar = {
      userId: userId || "",
      file: avatar || null,
      filename: avatar?.name || ""
    }
    console.log(userAvatar)
    UserRequest.setAvatar(userAvatar)
      .then((data) => {
        if (data.status) {
          UserRequest.getAvatar(userAvatar.userId)
            .then((data) => {
              if (data.status) {
                dispatch(setAvatar(data.message))
                setAvatarFile(undefined)
                setPreview("")
              }
            })
            .catch((err) => console.log(err))
        }
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    UserRequest.getAvatar(props.userId).then((data) => {
      if (data.status) setUserAvatar('http://localhost:2048/api/file/file/' + data.message)
    })
  }, [onEdit])

  return (
    <div className={styles.userInfo + " col-3 d-flex flex-column align-items-center"}>
      <div className={styles.userInfoImg}>
        {userId === props.userId &&
          <div className={styles.userInfoImgEdit + " " + btnStyles.btnHover}>
            <FontAwesomeIcon className={styles.userInfoImgEditIcon} icon={faPen} onClick={onClick} />
            <input type='file' id='file' ref={avatarInput} style={{ display: 'none' }} onChange={onChangeFile} />
          </div>
        }
        <img src={preview || userAvatar} />
        {preview &&
          <div className={styles.userInfoImgEditValidate + " " + btnStyles.btnHover} onClick={onEdit}>
            <FontAwesomeIcon className={styles.userInfoImgEditValidateIcon} icon={faCheck} />
          </div>
        }
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