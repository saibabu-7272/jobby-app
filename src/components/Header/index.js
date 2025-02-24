import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import {IoMdHome, IoMdExit} from 'react-icons/io'

import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const Header = props => {
  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className="jobby-navbar">
      <Link to="/">
        <img
          className="jobby-navbar-website-logo"
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
      </Link>

      <div className="jobby-navbar-icon-tabs-container">
        <IoMdHome className="jobby-navbar-tab-icon" />
        <BsFillBriefcaseFill className="jobby-navbar-tab-icon" />
        <IoMdExit className="jobby-navbar-tab-icon" />
      </div>
      <div className="jobby-navbar-text-tabs-container">
        <Link className="jobby-navbar-tab-text" to="/">
          Home
        </Link>
        <Link className="jobby-navbar-tab-text" to="/jobs">
          Jobs
        </Link>
      </div>
      <button onClick={onLogout} type="button" className="jobby-logout-button">
        Logout
      </button>
    </nav>
  )
}

export default withRouter(Header)
