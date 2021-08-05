import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import emptyAvatar from '../../assets/img/image 2.png';

import styles from './Search.module.scss';
import inputStyles from '../styles/Input.module.scss';

import { useEffect, useState } from 'react';
import { IUserPublic } from '../../models/user.interface';
import { UserRequest } from '../../api/user.api';

export function Search() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<IUserPublic[]>([])

  const onChange = (e: React.FormEvent<EventTarget>) => {
    let target = e.target as HTMLInputElement
    setQuery(target.value)
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query) {
        UserRequest.search(query)
          .then((data) => {
            console.log(data)
            if (data.status) {
              setResults(data.users)
            }
          })
      } else {
        setResults([])
      }
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [query])

  const [focused, setFocused] = useState(false)
  const onFocus = () => setFocused(true)
  const onBlur = () => setFocused(false)
  return (
    <div className={styles.search}>
      <div className={inputStyles.inputWrapper + " mb-0"}>
        <input className={inputStyles.inputText} type="text" placeholder="Search..." value={query} onChange={onChange} style={{ height: "34px" }} onFocus={onFocus} onBlur={onBlur} />
        <span className={inputStyles.inputIcon}>
          <FontAwesomeIcon icon={faSearch} />
        </span>
      </div>
      {results.length !== 0 && focused &&
        <div className={styles.searchResults}>
          {results.map((user) => <SearchItem key={user._id} user={user} />)}
        </div>
      }
    </div>
  )
}

function SearchItem(props: { user: IUserPublic }) {
  const [avatar, setAvatar] = useState(emptyAvatar)
  useEffect(() => {
    UserRequest.getAvatar(props.user._id)
      .then((data) => {
        if (data.status)
          setAvatar('http://localhost:2048/api/file/file/' + data.message)
      })
  }, [])

  const [selected, setSelected] = useState(false)
  const onMouveOver = () => {
    setSelected(true)
  }

  const onMouseLeave = () => {
    setSelected(false)
  }

  return (
    <div className={styles.searchItem + ` d-flex align-items-center ${selected ? styles.searchItemSelected : ""}`} onMouseOver={onMouveOver} onMouseLeave={onMouseLeave}>
      <div className={styles.searchItemIcon}>
        <img src={avatar} />
      </div>
      <div className={styles.searchItemTitle}>
        {props.user.name}
      </div>
    </div>
  )
}
