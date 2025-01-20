import './index.css'
import {Link} from 'react-router-dom'

import ThemeContext from '../../context/ThemeContext'

const UserItem = props => {
  const {each} = props
  const {
    id,
    name,
    username,
    email,
    phone,
    website,
    address: {
      street,
      suite,
      city,
      zipcode,
      geo: {lat, lng},
    },
    company: {name: companyName, catchPhrase, bs},
  } = each
  return (
    <ThemeContext.Consumer>
      {value => {
        const {theme} = value
        console.log(theme)
        return (
          <Link to={`users/${id}`} className="link-item">
            <div className={`user-detail-${theme}`}>
              <div className="user-header">
                <h1>{name}</h1>
                <p className="user-username">@{username}</p>
              </div>

              <div className="user-info-grid">
                <div className="info-card">
                  <h2>Contact Information</h2>
                  <p>
                    <strong>Email:</strong> {email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {phone}
                  </p>
                  <p>
                    <strong>Website:</strong>
                    <a
                      href={`https://${website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="website-link"
                    >
                      {website}
                    </a>
                  </p>
                </div>

                <div className="info-card">
                  <h2>Address</h2>
                  <p>
                    <strong>Street:</strong> {street}
                  </p>
                  <p>
                    <strong>Suite:</strong> {suite}
                  </p>
                  <p>
                    <strong>City:</strong> {city}
                  </p>
                  <p>
                    <strong>Zipcode:</strong> {zipcode}
                  </p>
                  <p>
                    <strong>Geo:</strong> Latitude: {lat}, Longitude: {lng}
                  </p>
                </div>

                <div className="info-card">
                  <h2>Company</h2>
                  <p>
                    <strong>Name:</strong> {companyName}
                  </p>
                  <p>
                    <strong>Catch Phrase:</strong> {catchPhrase}
                  </p>
                  <p>
                    <strong>Business:</strong> {bs}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default UserItem
