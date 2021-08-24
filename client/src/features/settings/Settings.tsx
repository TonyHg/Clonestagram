import { Drawer } from '@material-ui/core';
import styles from './Settings.module.scss';
import btnStyles from '../styles/Button.module.scss';
import inputStyles from '../styles/Input.module.scss';
import drawerStyles from '../styles/Drawer.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import { UserRequest } from '../../api/user.api';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { disconnect } from '../auth/authSlice';

export function Settings(props: { drawer: boolean, onClose: () => void }) {
  const dispatch = useDispatch();
  const anchor = 'bottom';
  const [error, setError] = useState(false)
  const [deleteConfirmation, setDeleteConfirmation] = useState(false)
  const userId = useSelector((state: RootState) => state.auth.token?._id) || ""
  const username = useSelector((state: RootState) => state.auth.token?.name) || ""


  const [user, setUser] = useState({
    name: username,
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
    UserRequest.updateUser(userId, user)
      .then((data) => {
        console.log(data)
        props.onClose()
      })
      .catch((err) => setError(true));
  }

  const onDelete = () => {
    if (!deleteConfirmation) {
      setDeleteConfirmation(true)
    } else {
      UserRequest.deleteUser(userId)
        .then((data) => {
          dispatch(disconnect())
        })
        .catch((err) => console.log(err))
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
            <input className={inputStyles.inputText} type="text" name="name" placeholder="Username" value={user.name} onChange={onChange} />
            <span className={inputStyles.inputIcon}>
              <FontAwesomeIcon icon={faUser} />
            </span>
          </div>
          <div className={inputStyles.inputWrapper}>
            <input className={inputStyles.inputText} type="password" name="password" placeholder="Password" value={user.password} onChange={onChange} />
            <span className={inputStyles.inputIcon}>
              <FontAwesomeIcon icon={faLock} />
            </span>
          </div>
          <div className={styles.settingsActions + " d-flex align-items-center"}>
            <div className={styles.settingsDeleteBtn + " m-auto" + ` ${deleteConfirmation ? styles.settingsDeleteBtnActive : ""}`} onClick={onDelete}>
              {!deleteConfirmation ? "Delete Account" : "Confirm Deletion"}
            </div>
            <button className={btnStyles.btnHover + " " + btnStyles.submitButton} disabled={(user.name === '' || user.name === username) && user.password === ""}>
              Save
            </button>

          </div>
        </form>
      </Drawer>
    </div>
  )
}