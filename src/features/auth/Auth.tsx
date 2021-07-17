import styles from './Auth.module.scss';
import { connect } from '../auth/authSlice';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';

export function Auth() {
  return (
    <div className={styles.auth + " d-flex flex-column justify-content-center align-items-center"}>
      <div className={styles.authBrandName + " mb-5"}>
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
  return (
    <form className={styles.authLogin + " column col-5 col-xs-12"}>
      <div className={styles.formTitle}>
        Login
      </div>
      <div className={styles.inputWrapper}>
        <input className={styles.inputText} type="text" name="email" placeholder="Email" />
        <span className={styles.inputIcon}>
          <FontAwesomeIcon icon={faEnvelope} />
        </span>
      </div>
      <div className={styles.inputWrapper}>
        <input className={styles.inputText} type="password" name="password" placeholder="Password" />
        <span className={styles.inputIcon}>
          <FontAwesomeIcon icon={faLock} />
        </span>
      </div>

      <div className={styles.submitButton + " d-flex " + styles.btnHover} onClick={() => dispatch(connect())}>
        <span className="m-auto">Login</span>
      </div>
    </form>
  )
}

function Register() {
  const dispatch = useDispatch()
  return (
    <form className={styles.authLogin + " column col-5 col-xs-12"}>
      <div className={styles.formTitle}>
        Register
      </div>
      <div className={styles.inputWrapper}>
        <input className={styles.inputText} type="text" name="username" placeholder="Username" />
        <span className={styles.inputIcon}>
          <FontAwesomeIcon icon={faUser} />
        </span>
      </div>
      <div className={styles.inputWrapper}>
        <input className={styles.inputText} type="text" name="email" placeholder="Email" />
        <span className={styles.inputIcon}>
          <FontAwesomeIcon icon={faEnvelope} />
        </span>
      </div>
      <div className={styles.inputWrapper}>
        <input className={styles.inputText} type="password" name="password" placeholder="Password" />
        <span className={styles.inputIcon}>
          <FontAwesomeIcon icon={faLock} />
        </span>
      </div>

      <div className={styles.submitButton + " d-flex " + styles.btnHover} onClick={() => dispatch(connect())}>
        <span className="m-auto">Register</span>
      </div>
    </form>
  )
}