import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './AddPost.module.scss';
import btnStyles from '../styles/Button.module.scss';
import { Drawer } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PostRequest } from '../../api/post.api';
import { Post } from '../../models/post.interface';
import { RootState } from '../../app/store';

export function AddPost() {
  const [drawer, setDrawer] = useState(false)
  const anchor = 'bottom';
  const onClose = () => setDrawer(false)
  return (
    <div className={styles.addPost}>
      <Drawer classes={{ paper: styles.drawer }} anchor={anchor} open={drawer} onClose={onClose}>
        <AddPostDrawer onClose={onClose} />
      </Drawer>
      <AddPostBtn onClick={() => setDrawer(true)} />
    </div>
  )
}

function AddPostDrawer(props: { onClose: () => void }) {
  const userId = useSelector((state: RootState) => state.auth.token?._id)
  const initialState: Post = {
    userId: userId || "noUser",
    file: null,
    description: '',
    uploadDate: '',
  }

  const [post, setPost] = useState(initialState);

  const onAddPost = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault()
    post.uploadDate = new Date().toISOString()
    console.log(post)
    PostRequest.createPost(post)
      .then((data) => {
        props.onClose()
      }).catch((err) => console.log(err))
  }

  const onChange = (e: React.FormEvent<EventTarget>) => {
    let target = e.target as HTMLInputElement;
    setPost({ ...post, [target.name]: target.value });
  };

  const onChangeFile = (e: React.FormEvent<EventTarget>) => {
    let target = e.target as HTMLInputElement;
    setPost({ ...post, ['file']: target.files!![0] })
  }

  return (
    <form onSubmit={onAddPost} className={styles.addPostDrawer + " d-flex"}>
      <div className={styles.addPostDrawerDrop + " d-flex flex-column col-6"}>
        <div className={styles.addPostDrawerTitle}>
          Media
        </div>
        <input type="file" name="file" onChange={onChangeFile} />
      </div>
      <div className={styles.addPostDrawerDescription + " d-flex flex-column col-6"}>
        <div className={styles.addPostDrawerTitle}>
          Description
        </div>
        <textarea className={styles.addPostDrawerDescriptionArea + " mb-4"} name="description" value={post.description} onChange={onChange} />
        <button className={btnStyles.submitButton + " " + btnStyles.btnHover} type="submit" disabled={post.description === '' || post.file === null}>Poster!</button>
      </div>
    </form>
  )
}

function AddPostBtn(props: { onClick: () => void }) {
  return (
    <div className={btnStyles.btnHover + " " + styles.addPostBtn} onClick={props.onClick}>
      <FontAwesomeIcon icon={faPlus} className={styles.addPostBtnIcon} size="2x" />
    </div>
  )
}
