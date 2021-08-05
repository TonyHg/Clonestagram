import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faPaperPlane, faComment } from '@fortawesome/free-regular-svg-icons';
import emptyAvatar from '../../assets/img/image 2.png';

import styles from './Post.module.scss';
import { IPostComment, IPostCommentWithUser, IPostUser, IPostWithUser } from '../../models/post.interface';
import { useEffect, useState } from 'react';
import { UserRequest } from '../../api/user.api';
import { useDispatch, useSelector } from 'react-redux';
import { switchView, views } from '../../appSlice';
import { setUser } from '../profile/profileSlice';
import { faHeart as fasHeart, faTrash } from '@fortawesome/free-solid-svg-icons';
import { RootState } from '../../app/store';
import { PostRequest } from '../../api/post.api';
import { select } from '../postDrawer/postDrawerSlice';

export function Post(props: { post: IPostWithUser }) {
  const [avatar, setAvatar] = useState(emptyAvatar)
  const userId = useSelector((state: RootState) => state.auth.token?._id) || ""

  const dispatch = useDispatch();
  useEffect(() => {
    UserRequest.getAvatar(props.post.user._id)
      .then((data) => {
        if (data.status)
          setAvatar('http://localhost:2048/api/file/file/' + data.message)
      })
  }, [])

  const onClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    dispatch(setUser(props.post.user._id))
    dispatch(switchView(views.PROFILE))
  }

  const postUser: IPostUser = { userId: userId, postId: props.post._id }
  const refresh = () => { }
  const [like, setLike] = useState(false)
  const onLike = () => {
    if (like) {
      PostRequest.unlike(postUser).then((data) => {
        if (data.status) {
          setLike(false)
          refresh()
        }
      })
    } else {
      PostRequest.like(postUser).then((data) => {
        if (data.status) {
          setLike(true)
          refresh()
        }
      })
    }
  }

  useEffect(() => {
    PostRequest.isLiked(postUser)
      .then((data) => {
        if (data.status) setLike(true)
      })
  }, [])

  const [likeCount, setLikeCount] = useState(0)
  useEffect(() => {
    PostRequest.getLikes(props.post._id)
      .then((data) => { if (data.status) setLikeCount(data.likes) })
  }, [refresh])

  return (
    <div className={styles.post + " mt-3 mb-5 d-flex"}>
      <PostHeader avatar={avatar} onClick={onClick} onLike={onLike} like={like} />
      <PostContent post={props.post} avatar={avatar} onClick={onClick} like={likeCount} />
      <PostComments postId={props.post._id} userId={userId} />
    </div>
  )
}

function PostHeader(props: { avatar: string, onClick: (e: React.MouseEvent<HTMLElement>) => void, onLike: () => void, like: boolean }) {
  return (
    <div className={styles.postHeader + " d-flex flex-column justify-content-between mx-3"}>
      <div className={styles.postUser} onClick={props.onClick}>
        <img src={props.avatar} />
      </div>
      <div className={styles.postActions + " d-flex flex-column align-items-center"}>
        <FontAwesomeIcon icon={props.like ? fasHeart : faHeart} size="2x" className="mb-2" onClick={props.onLike} color={props.like ? "lightcoral" : "black"} style={{ cursor: "pointer" }} />
        <FontAwesomeIcon icon={faComment} size="2x" className="mb-2" style={{ cursor: "pointer" }} />
        <FontAwesomeIcon icon={faPaperPlane} size="2x" className="mb-2" style={{ cursor: "pointer" }} />
      </div>
    </div>
  )
}

function PostContent(props: { post: IPostWithUser, avatar: string, onClick: (e: React.MouseEvent<HTMLElement>) => void, like: number }) {
  const date = new Date(props.post.uploadDate)
  const dispatch = useDispatch()
  const onDrawer = () => dispatch(select(props.post._id))
  return (
    <div className={styles.postContentWrapper} onClick={onDrawer}>
      <div className={styles.postContent}>
        <div className={styles.postLike}>
          <span>
            {props.like}
            <FontAwesomeIcon icon={fasHeart} color="white" />
          </span>
        </div>
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
    </div>
  )
}

export function PostComments(props: { postId: string, userId: string }) {
  const [comments, setComments] = useState<IPostCommentWithUser[]>([])

  const [comment, setComment] = useState("")
  const onChange = (e: React.FormEvent<EventTarget>) => {
    let target = e.target as HTMLInputElement;
    setComment(target.value)
  }

  const onComment = () => {
    const postComment: IPostComment = {
      userId: props.userId,
      postId: props.postId,
      comment: comment,
      uploadDate: new Date().toISOString()
    }
    PostRequest.comment(postComment).then((data) => {
      if (data.status) {
        setComment("")
        loadComments()
      }
    })
  }

  const loadComments = () => {
    if (props.postId) {
      PostRequest.getComments(props.postId)
        .then((data) => { if (data.status) setComments(data.comments) })
    }
  }

  useEffect(() => {
    loadComments()
    return () => {
      setComments([])
    }
  }, [])

  const onSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault()
    onComment()
  }

  return (
    <div className={styles.postComments}>
      <div className={styles.postCommentsWrapper}>
        {comments.map(c => <PostComment key={c._id} comment={c} userId={props.userId} loadComments={loadComments} />)}
      </div>
      <form onSubmit={onSubmit} className={styles.postInput + " d-flex align-items-center justify-content-between"}>
        <input type="text" placeholder="Write a comment" value={comment} onChange={onChange} className={styles.postInputText} />
        <FontAwesomeIcon icon={faPaperPlane} onClick={onComment} />
      </form>

    </div>
  )
}

function PostComment(props: { comment: IPostCommentWithUser, userId: string, loadComments: () => void }) {
  const [avatar, setAvatar] = useState(emptyAvatar)
  useEffect(() => {
    UserRequest.getAvatar(props.comment.user._id)
      .then((data) => {
        if (data.status)
          setAvatar('http://localhost:2048/api/file/file/' + data.message)
      })
  }, [])

  const dispatch = useDispatch()
  const onClick = () => { dispatch(setUser(props.comment.user._id)); dispatch(switchView(views.PROFILE)) }
  const date = "Posted " + new Date(props.comment.uploadDate).toDateString()

  const [del, setDel] = useState(false)
  const [confirm, setConfirm] = useState(false)
  const onMouseOver = () => {
    if (props.comment.user._id === props.userId) {
      setDel(true)
    }
  }
  const onMouseLeave = () => {
    setDel(false)
    setConfirm(false)
  }

  const onDelete = () => {
    if (!confirm) {
      setConfirm(true)
    } else {
      PostRequest.uncomment(props.comment._id)
        .then((data) => {
          if (data.status) props.loadComments()
        })
    }
  }

  return (
    <div className={styles.postComment} onMouseOver={onMouseOver} onMouseLeave={onMouseLeave}>
      <div className={styles.postCommentHeader + " d-flex align-items-center justify-content-between"}>
        <div className={styles.postCommentHeaderUser + " d-flex align-items-center"}>
          <div className={styles.postCommentHeaderUserImg} onClick={onClick}>
            <img src={avatar} />
          </div>
          <div className={styles.postCommentHeaderUserName} onClick={onClick}>
            {props.comment.user.name || "no user"}
          </div>
        </div>
        <div className={styles.postCommentHeaderTime}>
          {del ? <span className={styles.postCommentHeaderDelete} onClick={onDelete}>{confirm ? "Confirm deletion " : "Delete "}</span> : date}
        </div>
      </div>
      <div className={styles.postCommentText}>
        {props.comment.comment}
      </div>
    </div>
  )
}
