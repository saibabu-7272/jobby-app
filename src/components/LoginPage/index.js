import {Component} from 'react'

import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

class LoginPage extends Component {
  state = {username: '', password: '', errMsg: ''}

  componentDidMount() {
    this.onLogin = event => {
      event.preventDefault()
      this.getData()
    }
  }

  getData = async () => {
    const {username, password} = this.state
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const url = 'https://apis.ccbp.in/login'

    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      const {history} = this.props

      Cookies.set('jwt_token', data.jwt_token, {expires: 30})
      history.replace('/')
    } else {
      this.setState({errMsg: data.error_msg})
    }
  }

  onUpdateUsername = event => {
    this.setState({username: event.target.value})
  }

  onUpdatePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, errMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return (
        <div className="jobby-login-page">
          <form onSubmit={this.onLogin} className="jobby-login-card">
            <img
              className="jobby-website-logo"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
              alt="website logo"
            />
            <div>
              <label className="jobby-login-labels" htmlFor="username">
                USERNAME
              </label>
              <input
                className="jobby-login-inputs"
                type="text"
                id="username"
                placeholder="Username"
                value={username}
                onChange={this.onUpdateUsername}
              />
            </div>
            <div>
              <label className="jobby-login-labels" htmlFor="password">
                PASSWORD
              </label>
              <input
                className="jobby-login-inputs"
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={this.onUpdatePassword}
              />
            </div>
            <button className="jobby-login-button" type="submit">
              Login
            </button>
            {errMsg !== '' && <p className="errorMsg"> {errMsg}</p>}
          </form>
        </div>
      )
    }
    return <Redirect to="/" />
  }
}

export default LoginPage
