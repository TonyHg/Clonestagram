import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { faSlidersH } from '@fortawesome/free-solid-svg-icons';
import testIcon from '../../assets/img/image 2.png';

import styles from './Navbar.module.scss';

import { Search } from '../search/Search';

import { switchView, views } from '../../appSlice';
import { useDispatch } from 'react-redux';

export function Navbar() {
  const dispatch = useDispatch()
  return (
    <div className={styles.navbar + " d-flex"}>
      <div className={styles.navbarName} onClick={() => dispatch(switchView(views.FEED))}>
        Clonestagram
      </div>
      <Search />
      <div className={styles.navbarActions + " d-flex align-items-center"}>
        <div className={styles.navbarUser} onClick={() => dispatch(switchView(views.PROFILE))}>
          <img src={testIcon} />
        </div>
        <div onClick={() => dispatch(switchView(views.MESSENGER))}>
          <FontAwesomeIcon icon={faPaperPlane} />
        </div>

        <div onClick={() => dispatch(switchView(views.SETTINGS))}>
          <FontAwesomeIcon icon={faSlidersH} />
        </div>
      </div>
    </div>
  )
}