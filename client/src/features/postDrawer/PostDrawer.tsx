import { Drawer } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { unselect } from './postDrawerSlice';

import styles from './PostDrawer.module.scss';
import drawerStyles from '../styles/Drawer.module.scss';
import { useEffect, useState } from 'react';
import { PostRequest } from '../../api/post.api';
import { IPostWithUser } from '../../models/post.interface';
import emptyPost from '../../assets/img/image 1.png';
import { PostComments } from '../post/Post';

export function PostDrawer() {
  const userId = useSelector((state: RootState) => state.auth.token?._id) || ""
  const dispatch = useDispatch()
  const postId = useSelector((state: RootState) => state.post.postId)
  const drawer = useSelector((state: RootState) => state.post.drawer)
  const anchor = 'bottom';
  const onClose = () => dispatch(unselect())

  const [post, setPost] = useState<IPostWithUser>({
    _id: "",
    user: {
      _id: "",
      name: "",
      followers: 0,
      following: 0,
    },
    file: null,
    filename: "",
    description: "",
    uploadDate: "",
  })

  const [comment, setComment] = useState(<div>loading...</div>)

  useEffect(() => {
    if (postId) {
      PostRequest.getPost(postId)
        .then((data) => {
          console.log(data)
          if (data.status) {
            setPost(data.post)
          }
        })
      setComment(<PostComments postId={postId} userId={userId} />)
    }
  }, [postId])
  return (
    <div className={styles.postDrawer}>
      {postId &&
        <Drawer classes={{ paper: drawerStyles.drawer }} anchor={anchor} open={drawer} onClose={onClose}>
          <div className={styles.postDrawerWrapper + " d-flex"}>
            <div className={styles.postDrawerContent + " col-6"}>
              <div className={styles.postDrawerMedia}>
                {post.filename && <img src={'http://localhost:2048/api/file/file/' + post.filename} alt="" />}
              </div>
              <div className={styles.postDrawerDescription}>
                {post.description}
              </div>
            </div>
            <div className={styles.postDrawerComments + " col-6"}>
              {comment}
            </div>
          </div>
        </Drawer>
      }
    </div>
  )
}
