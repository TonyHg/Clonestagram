import styles from './Messenger.module.scss';
import btnStyles from '../styles/Button.module.scss';
import testIcon from '../../assets/img/image 2.png';
import { useState } from 'react';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import emptyAvatar from '../../assets/img/image 2.png';

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
  const [message, setMessage] = useState("")

  const onChange = (e: React.FormEvent<EventTarget>) => {
    let target = e.target as HTMLInputElement;
    setMessage(target.value)
  }

  const onMessage = () => {
    setMessage("")
  }

  const onSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault()
    onMessage()
  }

  return (
    <div className={styles.messengerChat + " col-7"}>
      <div className={styles.chatsWrapper}>
        <Chat isUser={false} />
        <Chat isUser={true} />
        <Chat isUser={false} />
        <Chat isUser={false} />
        <Chat isUser={false} />
        <Chat isUser={true} />
        <Chat isUser={true} />
        <Chat isUser={true} />
        <Chat isUser={false} />
        <Chat isUser={true} />
      </div>
      <form onSubmit={onSubmit} className={styles.chatInput + " d-flex align-items-center justify-content-between"}>
        <input type="text" placeholder="Write a message" value={message} onChange={onChange} className={styles.chatInputText} />
        <FontAwesomeIcon icon={faPaperPlane} onClick={onMessage} />
      </form>
    </div>
  )
}

function Chat(props: { isUser: boolean }) {
  return (
    <div className={styles.chat + " d-flex align-items-center mb-2 " + ` ${props.isUser ? styles.chatUser : ""}`}>
      <div className={styles.chatAvatar}>
        <img src={emptyAvatar} />
      </div>
      <div className={styles.chatMessage}>
        Hello this is a message.
      </div>
    </div>
  )
}
