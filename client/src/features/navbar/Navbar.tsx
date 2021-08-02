import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { faSlidersH, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import testIcon from '../../assets/img/image 2.png';

import styles from './Navbar.module.scss';

import { Search } from '../search/Search';

import { switchView, views } from '../../appSlice';
import { useDispatch, useSelector } from 'react-redux';
import { disconnect } from '../auth/authSlice';
import { RootState } from '../../app/store';
import { setUser } from '../profile/profileSlice';
import { Settings } from '../settings/Settings';

export function Navbar() {
  const dispatch = useDispatch()
  const userId = useSelector((state: RootState) => state.auth.token?._id) || ""

  const [drawer, setDrawer] = useState(false)
  const onClose = () => setDrawer(false)

  return (
    <div className={styles.navbar + " d-flex"}>
      <div className={styles.navbarName} onClick={() => dispatch(switchView(views.FEED))}>
        Clonestagram
        <Settings drawer={drawer} onClose={onClose} />
      </div>
      <Search />
      <div className={styles.navbarActions + " d-flex align-items-center"}>
        <div className={styles.navbarUser} onClick={() => { dispatch(setUser(userId)); dispatch(switchView(views.PROFILE)) }}>
          <img src={testIcon} />
        </div>
        <div onClick={() => dispatch(switchView(views.MESSENGER))}>
          <FontAwesomeIcon icon={faPaperPlane} />
        </div>

        <div onClick={() => setDrawer(true)}>
          <FontAwesomeIcon icon={faSlidersH} />
        </div>

        <div onClick={() => dispatch(disconnect())}>
          <FontAwesomeIcon icon={faSignOutAlt} />
        </div>
      </div>
    </div>
  )
}