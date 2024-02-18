import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import PasswordItem from '../PasswordItem'
import './index.css'

const initialBackgroundColorsList = [
  'color1',
  'color2',
  'color3',
  'color4',
  'color5',
  'color6',
  'color7',
  'color8',
]

const initialPasswordsList = []

class PasswordManager extends Component {
  state = {
    passwordsList: initialPasswordsList,
    websiteInput: '',
    usernameInput: '',
    passwordInput: '',
    searchInput: '',
    isPasswordsHave: true,
    isShowPasswords: false,
  }

  // On Show Passwords
  onShowPasswords = () => {
    this.setState(prevState => ({isShowPasswords: !prevState.isShowPasswords}))
  }

  // Creating new item to the list
  onCreateNewPassword = event => {
    event.preventDefault()
    const {websiteInput, usernameInput, passwordInput} = this.state

    const initialBgColorClassName = `${
      initialBackgroundColorsList[
        Math.ceil(Math.random() * initialBackgroundColorsList.length - 1)
      ]
    }`

    const newPasswordItem = {
      id: uuidv4(),
      website: websiteInput,
      username: usernameInput,
      password: passwordInput,
      initialBg: initialBgColorClassName,
    }

    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newPasswordItem],
      websiteInput: '',
      usernameInput: '',
      passwordInput: '',
    }))
  }

  onChangeWebsite = event => {
    this.setState({websiteInput: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({usernameInput: event.target.value})
  }

  onChangePassword = event => {
    this.setState({passwordInput: event.target.value})
  }

  onChangeSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  // Search to change
  deletePasswordItem = id => {
    const {passwordsList} = this.state
    const filteredPasswordsList = passwordsList.filter(
      eachItem => eachItem.id !== id,
    )

    if (filteredPasswordsList.length === 0) {
      this.setState({
        passwordsList: filteredPasswordsList,
        isPasswordsHave: false,
      })
    } else {
      this.setState({passwordsList: filteredPasswordsList})
    }
  }

  render() {
    const {
      passwordsList,
      websiteInput,
      usernameInput,
      passwordInput,
      searchInput,
      isShowPasswords,
    } = this.state

    let {isPasswordsHave} = this.state

    const searchResultList = passwordsList.filter(eachItem =>
      eachItem.website.toLowerCase().includes(searchInput.toLowerCase()),
    )

    if (searchResultList.length === 0) {
      isPasswordsHave = false
    }

    const noOfPasswords = searchResultList.length

    return (
      <div className="bg-container">
        <div className="app-container">
          <img
            className="app-logo"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
          />
          <div className="container top-container">
            <div className="user-input-container">
              <h1 className="add-password-text">Add New Password</h1>
              <form
                className="form-section"
                onSubmit={this.onCreateNewPassword}
              >
                <div className="input-section">
                  <div className="input-img-section">
                    <img
                      className="input-img"
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                      alt="website"
                    />
                  </div>
                  <input
                    className="input-box"
                    type="text"
                    placeholder="Enter Website"
                    value={websiteInput}
                    onChange={this.onChangeWebsite}
                  />
                </div>
                <div className="input-section">
                  <div className="input-img-section">
                    <img
                      className="input-img"
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                      alt="username"
                    />
                  </div>
                  <input
                    className="input-box"
                    type="text"
                    placeholder="Enter Username"
                    value={usernameInput}
                    onChange={this.onChangeUsername}
                  />
                </div>
                <div className="input-section">
                  <div className="input-img-section">
                    <img
                      className="input-img"
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                      alt="password"
                    />
                  </div>
                  <input
                    className="input-box"
                    type="password"
                    placeholder="Enter Password"
                    value={passwordInput}
                    onChange={this.onChangePassword}
                  />
                </div>

                <button className="add-button" type="submit">
                  Add
                </button>
              </form>
            </div>
            <div className="password-img-container">
              <img
                className="password-manager-img"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
                alt="password manager"
              />
            </div>
          </div>

          <div className="container bottom-container">
            <div className="bottom-container-top-section">
              <div className="passwords-count-section">
                <h1 className="your-passwords-text">Your Passwords</h1>
                <p className="passwords-count">{noOfPasswords}</p>
              </div>
              <div className="search-section">
                <div className="search-img-section">
                  <img
                    className="search-img"
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                    alt="search"
                  />
                </div>
                <input
                  className="search-input-box"
                  type="search"
                  placeholder="Search"
                  value={searchInput}
                  onChange={this.onChangeSearch}
                />
              </div>
            </div>
            <hr className="horizontal-line" />
            <div className="show-passwords-section">
              <input
                className="show-password-input"
                type="checkbox"
                id="showPasswords"
                onChange={this.onShowPasswords}
              />
              <label className="show-passwords-text" htmlFor="showPasswords">
                Show Passwords
              </label>
            </div>
            {isPasswordsHave && (
              <div className="results-container">
                <ul className="passwords-container">
                  {searchResultList.map(eachItem => (
                    <PasswordItem
                      passwordDetails={eachItem}
                      deletePasswordItem={this.deletePasswordItem}
                      isShowPasswords={isShowPasswords}
                      key={eachItem.id}
                    />
                  ))}
                </ul>
              </div>
            )}
            {!isPasswordsHave && (
              <div className="results-container">
                <div className="no-passwords-img-container">
                  <img
                    className="no-passwords-img"
                    src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                    alt="no passwords"
                  />
                  <p className="no-passwords-text">No Passwords</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordManager
