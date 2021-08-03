import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faPaperPlane, faComment } from '@fortawesome/free-regular-svg-icons';
import emptyAvatar from '../../assets/img/image 2.png';

import styles from './Post.module.scss';
import { IPostWithUser } from '../../models/post.interface';
import { useEffect, useState } from 'react';
import { UserRequest } from '../../api/user.api';
import { useDispatch } from 'react-redux';
import { switchView, views } from '../../appSlice';
import { setUser } from '../profile/profileSlice';

export function Post(props: { post: IPostWithUser }) {
  const [avatar, setAvatar] = useState(emptyAvatar)
  const dispatch = useDispatch();
  useEffect(() => {
    UserRequest.getAvatar(props.post.user._id)
      .then((data) => {
        if (data.status)
          setAvatar('http://localhost:2048/api/file/file/' + data.message)
      })
  }, [])

  const onClick = () => { dispatch(setUser(props.post.user._id)); dispatch(switchView(views.PROFILE)) }
  return (
    <div className={styles.post + " mt-3 mb-5 d-flex"}>
      <PostHeader avatar={avatar} onClick={onClick} />
      <PostContent post={props.post} avatar={avatar} onClick={onClick} />
      <PostComments />
    </div>
  )
}

function PostHeader(props: { avatar: string, onClick: () => void }) {
  return (
    <div className={styles.postHeader + " d-flex flex-column justify-content-between mx-3"}>
      <div className={styles.postUser} onClick={props.onClick}>
        <img src={props.avatar} />
      </div>
      <div className={styles.postActions + " d-flex flex-column align-items-center"}>
        <FontAwesomeIcon icon={faHeart} size="2x" className="mb-2" />
        <FontAwesomeIcon icon={faComment} size="2x" className="mb-2" />
        <FontAwesomeIcon icon={faPaperPlane} size="2x" className="mb-2" />
      </div>
    </div>
  )
}

function PostContent(props: { post: IPostWithUser, avatar: string, onClick: () => void }) {
  const date = new Date(props.post.uploadDate)
  return (
    <div className={styles.postContent}>
      <div className={styles.postMedia}>
        <img src={'http://localhost:2048/api/file/file/' + props.post.filename} alt="" />
      </div>
      <div className={styles.postDetails + " py-2 px-3"}>
        <div className={"d-flex justify-content-between align-items-center"}>
          <div className={"d-flex align-items-center mb-1"} onClick={props.onClick}>
            <div className={styles.postDetailsUser}>
              <img src={props.avatar} />
            </div>
            <div className={styles.postDetailsUserName}>{props.post.user.name}</div>
          </div>
          <div className={styles.postTime}>
            posted on {date.toDateString()}
          </div>
        </div>
        <div className={styles.postDescription}>
          {props.post.description}
        </div>
      </div>
    </div>
  )
}

function PostComments() {
  return (
    <div className={styles.postComments}>
      <PostComment />
      <PostComment />
      <div className={styles.postInput + " d-flex align-items-center justify-content-between"}>
        <input type="text" className={styles.postInputText} />
        <FontAwesomeIcon icon={faPaperPlane} />
      </div>

    </div>
  )
}

function PostComment() {
  return (
    <div className={styles.postComment}>
      <div className={styles.postCommentHeader + " d-flex align-items-center justify-content-between"}>
        <div className={styles.postCommentHeaderUser + " d-flex align-items-center"}>
          <div className={styles.postCommentHeaderUserImg}>
            <img src={emptyAvatar} />
          </div>
          <div className={styles.postCommentHeaderUserName}>
            Thdesign
          </div>
        </div>
        <div className={styles.postCommentHeaderTime}>
          Posted 5 min ago
        </div>
      </div>
      <div className={styles.postCommentText}>
        Not bad! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce quis...
      </div>
    </div>
  )
}