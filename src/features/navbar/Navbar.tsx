import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { faSlidersH } from '@fortawesome/free-solid-svg-icons';
import testIcon from '../../assets/img/image 2.png';

import styles from './Navbar.module.scss';

import { Search } from '../search/Search';

export function Navbar() {
  return (
    <div className={ styles.navbar + " d-flex" }>
      <a>
        BrandName
      </a>
      <Search/>
      <div className={ styles.navbarActions + " d-flex align-items-center" }>
        <div className={ styles.navbarUser }>
          <img src={ testIcon }/>
        </div>
        <div>
          <FontAwesomeIcon icon={ faPaperPlane }/>
        </div>
        
        <div>
          <FontAwesomeIcon icon={ faSlidersH }/>
        </div>
      </div>
    </div>
  )
}