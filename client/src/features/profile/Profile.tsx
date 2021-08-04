import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faImage, faUser } from '@fortawesome/free-regular-svg-icons';
import { faCheck, faPen, faUsers } from '@fortawesome/free-solid-svg-icons';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UserRequest } from '../../api/user.api';
import { RootState } from '../../app/store';

import emptyAvatar from '../../assets/img/image 2.png';
import { IPost } from '../../models/post.interface';
import { IUserProfileInfo } from '../../models/user.interface';

import styles from './Profile.module.scss';
import btnStyles from '../styles/Button.module.scss';
import { setAvatar } from '../../appSlice';
import { PostRequest } from '../../api/post.api';

export function Profile() {
  const initialState: IUserProfileInfo = { user: { _id: "", name: "", followers: 0, following: 0 }, posts: [] }
  const [user, setUser] = useState(initialState)
  const profileId = useSelector((state: RootState) => state.profile.userId)
  useEffect(() => {
    UserRequest.getUserProfile(profileId).then((data) => {
      console.log(data)
      const userProfileInfo: IUserProfileInfo = { user: data.user || "no name", posts: data.posts || [] }
      setUser(userProfileInfo)
    }).catch((err) => console.log(err))
  }, [profileId])

  return (
    <div className={styles.profile + " d-flex"}>
      <UserInfo user={user} profileId={profileId} />
      <Portfolio posts={user.posts} />
    </div>
  )
}

function UserInfo(props: { user: IUserProfileInfo, profileId: string }) {
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.auth.token?._id) || ""
  const [userAvatar, setUserAvatar] = useState(emptyAvatar)
  const isUser = userId === props.profileId

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
    UserRequest.getAvatar(props.profileId).then((data) => {
      if (data.status) setUserAvatar('http://localhost:2048/api/file/file/' + data.message)
    })
  }, [onEdit])

  return (
    <div className={styles.userInfo + " col-3 d-flex flex-column align-items-center"}>
      <div className={styles.userInfoImg}>
        {isUser &&
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
        {props.user.user.name}
      </div>
      <UserInfoStat icon={faUser} val={props.user.user.followers} name="Followers" />
      <UserInfoStat icon={faUsers} val={props.user.user.following} name="Following" />
      <UserInfoStat icon={faImage} val={props.user.posts.length} name="Post" />
      <UserActions userId={userId} profileId={props.profileId} isDisabled={isUser} />
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

function UserActions(props: { userId: string, profileId: string, isDisabled: boolean }) {
  const [follow, setFollow] = useState(false)
  const userFollow = { userId: props.profileId, followerId: props.userId }

  const onClick = () => {
    if (follow) {
      UserRequest.unfollow(userFollow)
        .then((data) => {
          console.log(data);
          if (data.status) setFollow(false)
        })
    } else {
      UserRequest.follow(userFollow)
        .then((data) => {
          console.log(data);
          if (data.status) setFollow(true)
        })
    }
  }


  useEffect(() => {
    UserRequest.isFollowing(userFollow)
      .then((data) => {
        if (data.status) {
          setFollow(true)
        } else {
          setFollow(false)
        }
      })
  }, [])

  return (
    <div className={styles.userInfoActions + " d-flex flex-column"}>
      <button className={btnStyles.btnHover + " mb-2 mt-5 d-flex " + btnStyles.submitButton} disabled={props.isDisabled} onClick={onClick}>
        <span className="m-auto">{follow ? "Unfollow" : "Follow"}</span>
      </button>
      <div className={btnStyles.btnHover + " mb-2 mt-2 d-flex " + btnStyles.secondaryButton}>
        <span className="m-auto">Message</span>
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
  const [like, setLike] = useState(0)
  useEffect(() => {
    PostRequest.getLikes(props.post._id)
      .then((data) => { if (data.status) setLike(data.likes) })
  }, [])
  return (
    <div className={styles.portfolioItemWrapper}>
      <div className={styles.portfolioItem + " mb-5"}>
        <div className={styles.portfolioItemLike}>
          <span>
            {like}
            <FontAwesomeIcon icon={fasHeart} color="white" />
          </span>
        </div>
        <div className={styles.portfolioItemMedia}>
          <img src={'http://localhost:2048/api/file/file/' + props.post.filename} />
        </div>
        <div className={styles.portfolioItemDescription + " py-1 px-3"}>
          {props.post.description}
        </div>
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
