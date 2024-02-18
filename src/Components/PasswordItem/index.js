import './index.css'

const PasswordItem = props => {
  const {passwordDetails, deletePasswordItem, isShowPasswords} = props
  const {website, username, initialBg, password, id} = passwordDetails
  const onDeleteItem = () => {
    deletePasswordItem(id)
  }
  const initialLetter = website.slice(0, 1).toUpperCase()
  return (
    <li className="password-item">
      <div className="password-container">
        <div className="main-deatils-password">
          <div>
            <p className={`initial-section initial ${initialBg}`}>
              {initialLetter}
            </p>
          </div>
          <div className="password-details">
            <p className="password-website">{website}</p>
            <p className="password-username">{username}</p>
            {isShowPasswords ? (
              <p className="password-password">{password}</p>
            ) : (
              <img
                className="stars-img"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                alt="stars"
              />
            )}
          </div>
        </div>
        <button
          className="delete-button"
          type="button"
          data-testid="delete"
          onClick={onDeleteItem}
        >
          <img
            className="delete-img"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
            alt="delete"
          />
        </button>
      </div>
    </li>
  )
}

export default PasswordItem

// <p className="password-password">{password}</p>
