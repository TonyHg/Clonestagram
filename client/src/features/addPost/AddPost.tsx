import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './AddPost.module.scss';
import btnStyles from '../styles/Button.module.scss';
import { Drawer } from '@material-ui/core';
import React, { useState } from 'react';

export function AddPost() {
  const [drawer, setDrawer] = useState(false)
  const anchor = 'bottom';
  return (
    <div className={styles.addPost}>
      <Drawer classes={{ paper: styles.drawer }} anchor={anchor} open={drawer} onClose={() => setDrawer(false)}>
        <AddPostDrawer />
      </Drawer>
      <AddPostBtn onClick={() => setDrawer(true)} />
    </div>
  )
}

function AddPostDrawer() {
  const onAddPost = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault()
  }

  return (
    <form onSubmit={onAddPost} className={styles.addPostDrawer + " d-flex"}>
      <div className={styles.addPostDrawerDrop + " d-flex flex-column col-6"}>
        <div className={styles.addPostDrawerTitle}>
          Media
        </div>
        <input type="file" />
      </div>
      <div className={styles.addPostDrawerDescription + " d-flex flex-column col-6"}>
        <div className={styles.addPostDrawerTitle}>
          Description
        </div>
        <textarea className={styles.addPostDrawerDescriptionArea + " mb-4"} />
        <button className={btnStyles.submitButton + " " + btnStyles.btnHover} type="submit">Poster!</button>
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
