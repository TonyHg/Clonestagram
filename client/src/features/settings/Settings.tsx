import { Drawer } from '@material-ui/core';
import styles from './Settings.module.scss';
import btnStyles from '../styles/Button.module.scss';
import inputStyles from '../styles/Input.module.scss';
import drawerStyles from '../styles/Drawer.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';

export function Settings(props: { drawer: boolean, onClose: () => void }) {
  const anchor = 'bottom';
  const [error, setError] = useState(false)
  const [deleteConfirmation, setDeleteConfirmation] = useState(false)

  const [user, setUser] = useState({
    email: '',
    name: '',
    password: '',
  });

  const onChange = (e: React.FormEvent<EventTarget>) => {
    let target = e.target as HTMLInputElement;
    setUser({ ...user, [target.name]: target.value });
    if (error) setError(false)
  };

  const onSave = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault()
    setError(false)
    props.onClose()
  }

  const onDelete = () => {
    if (!deleteConfirmation) {
      setDeleteConfirmation(true)
    } else {
      console.log("this account will be deleted");
    }
  }

  return (
    <div className={styles.settings}>
      <Drawer classes={{ paper: drawerStyles.drawer }} anchor={anchor} open={props.drawer} onClose={props.onClose}>
        <form onSubmit={onSave} className={styles.settingsForm}>
          <div className={inputStyles.formTitle}>
            Settings
          </div>
          <div className={inputStyles.inputWrapper}>
            <input className={inputStyles.inputText} type="text" name="name" placeholder="Username" value={user.name} onChange={onChange} required />
            <span className={inputStyles.inputIcon}>
              <FontAwesomeIcon icon={faUser} />
            </span>
          </div>
          <div className={inputStyles.inputWrapper}>
            <input className={inputStyles.inputText} type="password" name="password" placeholder="Password" value={user.password} onChange={onChange} required />
            <span className={inputStyles.inputIcon}>
              <FontAwesomeIcon icon={faLock} />
            </span>
          </div>
          <div className={styles.settingsActions + " d-flex align-items-center"}>
            <div className={styles.settingsDeleteBtn + " m-auto" + ` ${deleteConfirmation ? styles.settingsDeleteBtnActive : ""}`} onClick={onDelete}>
              {!deleteConfirmation ? "Delete Account" : "Confirm Deletion"}
            </div>
            <button className={btnStyles.btnHover + " " + btnStyles.submitButton}>
              Save
            </button>

          </div>
        </form>
      </Drawer>
    </div>
  )
}