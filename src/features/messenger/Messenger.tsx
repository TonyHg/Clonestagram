import styles from './Messenger.module.scss';
import btnStyles from '../styles/Button.module.scss';
import testIcon from '../../assets/img/image 2.png';

export function Messenger() {
  return (
    <div className={styles.messenger + " row w-100"}>
      <MessengerHub />
      <MessengerChat />
    </div>
  )
}

function MessengerHub() {
  return (
    <div className={styles.messengerHub + " col-5 d-flex flex-column justify-content-between align-items-center p-3"}>
      <div className={styles.messengerHubPreviews}>
        <MessengerPreview isSelected={true} />
        <MessengerPreview isSelected={false} />
        <MessengerPreview isSelected={false} />
      </div>
      <div className={styles.messengerHubFooter}>
        <div className={btnStyles.submitButton + " d-flex " + btnStyles.btnHover + " " + styles.messengerHubNewConversation}>
          <span className="m-auto">New Conversation</span>
        </div>
      </div>
    </div>
  )
}

function MessengerPreview({ isSelected }: { isSelected: Boolean }) {
  return (
    <div className={styles.messengerPreview + ` ${isSelected ? styles.selected : ""} d-flex justify-content-center align-items-center mb-2`}>
      <div className={styles.messengerPreviewIcon}>
        <img src={testIcon} />
      </div>
      <div className={styles.messengerPreviewHeader}>
        <div className={styles.messengerPreviewUserName}>
          Friend 1
        </div>
        <div className={styles.messengerPreviewText}>
          Lorem ipsum Lorem ipsum Lorem  Lorem  Lorips...
        </div>
      </div>
    </div>
  )
}

function MessengerChat() {
  return (
    <div className={styles.messengerChat + " col-7"}>
      chat
    </div>
  )
}