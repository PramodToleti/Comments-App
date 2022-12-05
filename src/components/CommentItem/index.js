import './index.css'

const CommentItem = props => {
  const {
    commentDetails,
    onToggleLike,
    onDeleteUserComment,
    commentTime,
    isDarkModeEnabled,
  } = props
  const {
    id,
    username,
    comment,
    backgroundColorClassName,
    isLiked,
  } = commentDetails
  const firstLetter = username.slice(0, 1).toUpperCase()
  const likeIcon = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'
  const likeStyle = isLiked ? 'liked-text' : 'unliked-text'
  const darkCommentCard = isDarkModeEnabled ? 'dark-comments-card' : ''
  const separatorColor = isDarkModeEnabled
    ? 'dark-separator'
    : 'comment-separator'

  const onDeleteComment = () => {
    onDeleteUserComment(id)
  }

  const onClickLike = () => {
    onToggleLike(id)
  }

  return (
    <li className={`user-comment-container ${darkCommentCard}`}>
      <div className="user-comment-body">
        <div className={`user-icon ${backgroundColorClassName}`}>
          {firstLetter}
        </div>
        <div>
          <div className="user-comment-time">
            <h1 className="username">{username}</h1>
            <p className="commented-time">{commentTime}</p>
          </div>
          <p className="comment">{comment}</p>
        </div>
      </div>
      <div className="like-delete-container">
        <div className="like-section">
          <img src={likeIcon} alt="like" className="like-icon" />
          <button
            className={`like-text like-button ${likeStyle}`}
            onClick={onClickLike}
            type="button"
          >
            Like
          </button>
        </div>
        <button
          className="delete-comment-button"
          onClick={onDeleteComment}
          type="button"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
            className="delete-icon"
          />
        </button>
      </div>
      <hr className={separatorColor} />
    </li>
  )
}

export default CommentItem
