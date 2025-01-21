import {Component} from 'react'
import {Link} from 'react-router-dom'
import {HashLoader} from 'react-spinners'
import {withRouter} from './withRouter'
import ThemeContext from '../../context/ThemeContext'
import './index.css'

class UserDetail extends Component {
  state = {
    user: {},
    isLoading: true,
    error: null,
  }

  componentDidMount() {
    this.getUserDetails()
  }

  getUserDetails = async () => {
    
    const id = this.props.params.id

    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`,
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      this.setState({user: data, isLoading: false})
    } catch (error) {
      this.setState({error: error.message, isLoading: false})
    }
  }

  render() {
    const {user, isLoading, error} = this.state

    if (isLoading) {
      return (
        <div className="loader-container">
          <HashLoader size={50} color="#36d7b7" />
        </div>
      )
    }

    if (error) {
      return (
        <div className="error-container">
          <h1 className="error-heading">Error</h1>
          <p className="error-message">{error}</p>
          <Link to="/" className="go-back-link">
            <button type="button" className="go-back-button">
              Go Back
            </button>
          </Link>
        </div>
      )
    }

    const {
      name,
      username,
      email,
      phone,
      website,
      address,
      company,
    } = user

    return (
      <ThemeContext.Consumer>
        {value => {
          const {theme} = value
          return (
            <div className={`user-detail-container-${theme}`}>
              <h1 className={`user-detail-heading-${theme}`}>User Details</h1>
              <div className="user-info-card">
                <h2>Personal Information</h2>
                <p><strong>Name:</strong> {name}</p>
                <p><strong>Username:</strong> {username}</p>
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Phone:</strong> {phone}</p>
                <p>
                  <strong>Website:</strong>
                  <a href={`http://${website}`} target="_blank" rel="noopener noreferrer">
                    {website}
                  </a>
                </p>
              </div>

              {address && (
                <div className="user-info-card">
                  <h2>Address</h2>
                  <p><strong>Street:</strong> {address.street}</p>
                  <p><strong>Suite:</strong> {address.suite}</p>
                  <p><strong>City:</strong> {address.city}</p>
                  <p><strong>Zipcode:</strong> {address.zipcode}</p>
                  {address.geo && (
                    <p><strong>Geo:</strong> Lat: {address.geo.lat}, Lng: {address.geo.lng}</p>
                  )}
                </div>
              )}

              {company && (
                <div className="user-info-card">
                  <h2>Company</h2>
                  <p><strong>Name:</strong> {company.name}</p>
                  <p><strong>Catchphrase:</strong> {company.catchPhrase}</p>
                  <p><strong>Business:</strong> {company.bs}</p>
                </div>
              )}

              <Link to="/" className="go-back-link">
                <button type="button" className={`go-back-button-${theme}`}>
                  Go Back
                </button>
              </Link>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default withRouter(UserDetail)