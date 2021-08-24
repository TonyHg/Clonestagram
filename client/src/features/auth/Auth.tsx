import styles from './Auth.module.scss';
import btnStyles from '../styles/Button.module.scss';
import inputStyles from '../styles/Input.module.scss';
import fontStyles from '../styles/Font.module.scss';
import { connect } from '../auth/authSlice';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { UserRequest } from '../../api/user.api';
import { setAvatar } from '../../appSlice';

export function Auth() {
  return (
    <div className={styles.auth + " d-flex flex-column justify-content-center align-items-center"}>
      <div className={styles.authBrandName + " mb-5 " + fontStyles.brand}>
        Clonestagram
      </div>
      <div className={styles.authMethodWrapper + " row justify-content-center"}>
        <Login />
        <div className={styles.authDivider + " col-2"}>
          <div></div>
        </div>
        <Register />
      </div>

    </div>
  )
}

function Login() {
  const dispatch = useDispatch()

  const [user, setUser] = useState({
    email: '',
    name: '',
    password: '',
  });

  const [error, setError] = useState(false)

  const onChange = (e: React.FormEvent<EventTarget>) => {
    let target = e.target as HTMLInputElement;
    setUser({ ...user, [target.name]: target.value });
    if (error) setError(false)
  };

  const onLogin = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault()
    setError(false)
    UserRequest.loginUser(user)
      .then((data) => {
        console.log(data)
        dispatch(connect(data))
        UserRequest.getAvatar(data._id)
          .then((data) => {
            if (data.status) dispatch(setAvatar(data.message))
          })
          .catch((err) => console.log(err))
      })
      .catch((err) => {
        setError(true)
      });
  }

  return (
    <form onSubmit={onLogin} className={styles.authLogin + " column col-5 col-xs-12"}>
      <div className={inputStyles.formTitle}>
        Login
      </div>
      <div className={inputStyles.inputWrapper}>
        <input className={inputStyles.inputText + ` ${error ? inputStyles.error : ""}`} type="text" name="email" placeholder="Email" value={user.email} onChange={onChange} required />
        <span className={inputStyles.inputIcon}>
          <FontAwesomeIcon icon={faEnvelope} />
        </span>
      </div>
      <div className={inputStyles.inputWrapper}>
        <input className={inputStyles.inputText + ` ${error ? inputStyles.error : ""}`} type="password" name="password" placeholder="Password" value={user.password} onChange={onChange} required />
        <span className={inputStyles.inputIcon}>
          <FontAwesomeIcon icon={faLock} />
        </span>
      </div>

      <button className={btnStyles.submitButton + " d-flex " + btnStyles.btnHover} type="submit">
        <span className="m-auto">Login</span>
      </button>
    </form>
  )
}

function Register() {
  const dispatch = useDispatch()

  const [user, setUser] = useState({
    email: '',
    name: '',
    password: '',
  });

  const [error, setError] = useState(false)

  const onChange = (e: React.FormEvent<EventTarget>) => {
    let target = e.target as HTMLInputElement;
    setUser({ ...user, [target.name]: target.value });
    if (error) setError(false)
  };

  const onRegister = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(user)
    setError(false)
    UserRequest.createUser(user)
      .then((data) => {
        console.log(data)
        dispatch(connect(data))
      })
      .catch((err) => {
        setError(true)
      });
  }

  return (
    <form onSubmit={onRegister} className={styles.authLogin + " column col-5 col-xs-12"}>
      <div className={inputStyles.formTitle}>
        Register
      </div>
      <div className={inputStyles.inputWrapper}>
        <input className={inputStyles.inputText} type="text" name="name" placeholder="Username" value={user.name} onChange={onChange} required />
        <span className={inputStyles.inputIcon}>
          <FontAwesomeIcon icon={faUser} />
        </span>
      </div>
      <div className={inputStyles.inputWrapper}>
        <input className={inputStyles.inputText + ` ${error ? styles.error : ""}`} type="text" name="email" placeholder="Email" value={user.email} onChange={onChange} required />
        <span className={inputStyles.inputIcon}>
          <FontAwesomeIcon icon={faEnvelope} />
        </span>
      </div>
      <div className={inputStyles.inputWrapper}>
        <input className={inputStyles.inputText} type="password" name="password" placeholder="Password" value={user.password} onChange={onChange} required />
        <span className={inputStyles.inputIcon}>
          <FontAwesomeIcon icon={faLock} />
        </span>
      </div>

      <button type="submit" className={btnStyles.submitButton + " d-flex " + btnStyles.btnHover} >
        <span className="m-auto">Register</span>
      </button>
    </form >
  )
}
