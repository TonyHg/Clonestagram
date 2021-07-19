import react from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import styles from './Search.module.scss';

export function Search() {
  return (
    <div className={styles.search}>
      <FontAwesomeIcon icon={faSearch} />
      <span className={styles.searchInput}>
        Search
      </span>
    </div>
  )
}