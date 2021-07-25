import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faPaperPlane, faComment } from '@fortawesome/free-regular-svg-icons';
import testImg from '../../assets/img/image 1.png';
import testIcon from '../../assets/img/image 2.png';

import styles from './Post.module.scss';

export function Post() {
  return (
    <div className={styles.post + " mt-3 mb-5 d-flex"}>
      <PostHeader />
      <PostContent />
      <PostComments />
    </div>
  )
}

function PostHeader() {
  return (
    <div className={styles.postHeader + " d-flex flex-column justify-content-between mx-3"}>
      <div className={styles.postUser}>
        <img src={testIcon} />
      </div>
      <div className={styles.postActions + " d-flex flex-column align-items-center"}>
        <FontAwesomeIcon icon={faHeart} size="2x" className="mb-2" />
        <FontAwesomeIcon icon={faComment} size="2x" className="mb-2" />
        <FontAwesomeIcon icon={faPaperPlane} size="2x" className="mb-2" />
      </div>
    </div>
  )
}

function PostContent() {
  return (
    <div className={styles.postContent}>
      <div className={styles.postMedia}>
        <img src={testImg} />
      </div>
      <div className={styles.postDetails + " py-2 px-3"}>
        <div className={"d-flex justify-content-between align-items-center"}>
          <div className={"d-flex align-items-center mb-1"}>
            <div className={styles.postDetailsUser}>
              <img src={testIcon} />
            </div>
            <div className={styles.postDetailsUserName}>Instagram</div>
          </div>
          <div className={styles.postTime}>
            posted 5 mins ago
          </div>
        </div>
        <div className={styles.postDescription}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce quis Lorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit amet
        </div>
      </div>
    </div>
  )
}

function PostComments() {
  return (
    <div className={styles.postComments}>
      <PostComment />
      <PostComment />
      <div className={styles.postInput + " d-flex align-items-center justify-content-between"}>
        <input type="text" className={styles.postInputText} />
        <FontAwesomeIcon icon={faPaperPlane} />
      </div>

    </div>
  )
}

function PostComment() {
  return (
    <div className={styles.postComment}>
      <div className={styles.postCommentHeader + " d-flex align-items-center justify-content-between"}>
        <div className={styles.postCommentHeaderUser + " d-flex align-items-center"}>
          <div className={styles.postCommentHeaderUserImg}>
            <img src={testIcon} />
          </div>
          <div className={styles.postCommentHeaderUserName}>
            Thdesign
          </div>
        </div>
        <div className={styles.postCommentHeaderTime}>
          Posted 5 min ago
        </div>
      </div>
      <div className={styles.postCommentText}>
        Not bad! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce quis...
      </div>
    </div>
  )
}