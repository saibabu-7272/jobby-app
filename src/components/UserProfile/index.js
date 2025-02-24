import {Component} from 'react'

import Cookies from 'js-cookie'

import './index.css'

class UserProfile extends Component {
  state = {profile: {}}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const url = `https://apis.ccbp.in/profile`
    const response = await fetch(url, options)
    const data = await response.json()
    const dt = data.profile_details
    const profileDetails = {
      name: dt.name,
      profileImage: dt.profile_image_url,
      bio: dt.short_bio,
    }
    if (response.ok) {
      this.setState({profile: profileDetails})
    }
  }

  render() {
    const {profile} = this.state
    const {name, profileImage, bio} = profile
    return (
      <div className="profile-card">
        <img src={profileImage} alt="profile" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-bio">{bio}</p>
      </div>
    )
  }
}

export default UserProfile
