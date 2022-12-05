import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {formatDistanceToNow} from 'date-fns'
import CommentItem from '../CommentItem'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {
    username: '',
    comment: '',
    commentsList: [],
    commentsCount: 0,
    isDarkModeEnabled: false,
    time: '',
  }

  onToggleDarkMode = () => {
    this.setState(prevState => ({
      isDarkModeEnabled: !prevState.isDarkModeEnabled,
    }))
  }

  onDeleteUserComment = id => {
    const {commentsList} = this.state
    const filteredComments = commentsList.filter(each => each.id !== id)
    this.setState(prevState => ({
      commentsList: filteredComments,
      commentsCount: prevState.commentsCount - 1,
    }))
  }

  onToggleLike = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(each => {
        if (each.id === id) {
          return {...each, isLiked: !each.isLiked}
        }
        return each
      }),
    }))
  }

  onChangeUserComment = event => {
    this.setState({comment: event.target.value})
  }

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onAddComment = event => {
    event.preventDefault()
    const {username, comment} = this.state
    const backgroundColorClassName = `profile-icon-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`
    const newComment = {
      id: uuidv4(),
      username,
      comment,
      backgroundColorClassName,
      isLiked: false,
    }
    this.setState(prevState => ({
      username: '',
      comment: '',
      commentsList: [...prevState.commentsList, newComment],
      commentsCount: prevState.commentsCount + 1,
    }))
    const timer = formatDistanceToNow(new Date())
    this.setState({time: timer})
  }

  render() {
    const {
      username,
      comment,
      commentsList,
      commentsCount,
      isDarkModeEnabled,
      time,
    } = this.state
    const commentTime = time.concat(' ago')
    const modeImage = isDarkModeEnabled
      ? 'https://www.citypng.com/public/uploads/preview/free-speech-comment-chat-white-icon-png-116413993382r6hpqpfxr.png'
      : 'https://www.citypng.com/public/uploads/small/11641399344inlsxmiu4bj37nntjelor6xmeafh4yyzzyrquazl5sneyp7m9h5j25n0kwvujtle1a2kvnljj93ejntd9txu4kjhjkwkmgwym9ok.png'
    const iconStyles = isDarkModeEnabled ? 'light-icon' : ''
    const backgroundColors = isDarkModeEnabled ? 'dark-bg-color' : ''
    const textColor = isDarkModeEnabled ? 'dark-mode-text' : ''
    const darkButton = isDarkModeEnabled ? 'dark-button-styles' : ''
    return (
      <div className={`bg-container ${backgroundColors}`}>
        <div className="comments-card">
          <div className="dark-light-container">
            <img
              src={modeImage}
              alt="darkIcon"
              className={`theme-icon ${iconStyles}`}
              onClick={this.onToggleDarkMode}
            />
            <h1 className={`comments-title ${textColor}`}>Comments</h1>
          </div>

          <div className="header">
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
              className="comments-image"
            />
            <form className="input-container" onSubmit={this.onAddComment}>
              <p className={`about-description ${textColor}`}>
                Say something about 4.0 Technologies
              </p>
              <input
                type="text"
                value={username}
                placeholder="Your Name"
                className="name-input input-styles"
                onChange={this.onChangeUserName}
              />
              <br />
              <textarea
                cols="5"
                rows="6"
                value={comment}
                placeholder="Your Comment"
                className="comment-input input-styles"
                onChange={this.onChangeUserComment}
              />
              <button
                onSubmit={this.onClickAdd}
                className={`add-button ${darkButton}`}
                type="submit"
              >
                Add Comment
              </button>
            </form>
          </div>
          <hr className="separator" />
          <div className="comments-count-container">
            <p className={`comments-count ${darkButton}`}>{commentsCount}</p>
            <p className={`comments-count-title ${textColor}`}>Comments</p>
          </div>
          <div className="container">
            <ul className="users-comments-card">
              {commentsList.map(each => (
                <CommentItem
                  key={each.id}
                  commentDetails={each}
                  onToggleLike={this.onToggleLike}
                  onDeleteUserComment={this.onDeleteUserComment}
                  commentTime={commentTime}
                  isDarkModeEnabled={isDarkModeEnabled}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Comments
