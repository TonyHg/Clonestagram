import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faImage, faUser } from '@fortawesome/free-regular-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { UserRequest } from '../../api/user.api';
import { RootState } from '../../app/store';

import testImg from '../../assets/img/image 1.png';
import testIcon from '../../assets/img/image 2.png';
import { IUser, IUserProfileInfo } from '../../models/user.interface';

import styles from './Profile.module.scss';

export function Profile() {
  const initialState: IUserProfileInfo = { name: "" }
  const [user, setUser] = useState(initialState)
  const userEmail = useSelector((state: RootState) => state.auth.token!!.email)
  useEffect(() => {
    UserRequest.getUser(userEmail).then((data) => {
      const userProfileInfo: IUserProfileInfo = { name: data.name || "no name" }
      setUser(userProfileInfo)
    })

  }, [userEmail])

  return (
    <div className={styles.profile + " d-flex"}>
      <UserInfo name={user.name} />
      <Portfolio />
    </div>
  )
}

function UserInfo({ name }: IUserProfileInfo) {
  return (
    <div className={styles.userInfo + " col-4 d-flex flex-column align-items-center"}>
      <div className={styles.userInfoImg}>
        <img src={testIcon} />
      </div>
      <div className={styles.userInfoName + " my-3"}>
        {name}
      </div>
      <UserInfoStat icon={faUser} val={42} name="Followers" />
      <UserInfoStat icon={faUsers} val={512} name="Following" />
      <UserInfoStat icon={faImage} val={512} name="Post" />
      <UserActions />
    </div>
  )
}

interface UserInfoStatProp {
  icon: IconProp,
  val: Number,
  name: String
}

function UserInfoStat({ icon, val, name }: UserInfoStatProp) {
  return (
    <div className={styles.userInfoStat + " d-flex justify-content-center align-items-center"}>
      <FontAwesomeIcon icon={icon} className={styles.userInfoStatIcon} size="lg" />
      <div className={styles.userInfoStatVal + " mx-2"}>{val}</div>
      <div className={styles.userInfoStatName}>{name}</div>
    </div>
  )
}

function UserActions() {
  return (
    <div className={styles.userInfoActions + " d-flex flex-column"}>
      <div className={styles.userInfoActionsPrimary + " mb-2 mt-5"}>
        Follow
      </div>
      <div className={styles.userInfoActionsSecondary}>
        Message
      </div>
    </div>
  )
}

function Portfolio() {
  return (
    <div className={styles.portfolio + " col-8 d-flex flex-wrap justify-content-between"}>
      <PortfolioItem />
      <PortfolioItem />
      <PortfolioItem />
      <PortfolioItem />
      <PortfolioItem />
      <PortfolioItem />
      <PortfolioItem />
    </div>
  )
}

function PortfolioItem() {
  return (
    <div className={styles.portfolioItem + " mb-5"}>
      <div className={styles.portfolioItemMedia}>
        <img src={testImg} />
      </div>
      <div className={styles.portfolioItemDescription + " py-1 px-3"}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce quis Lorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit amet
      </div>
    </div>
  )
}