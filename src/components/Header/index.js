import ThemeContext from '../../context/ThemeContext'

import './index.css'

const Header = () => (
  <ThemeContext.Consumer>
    {value => {
      const {onChangeTheme, theme} = value
      const handleChange = event => onChangeTheme(event.target.value)
      return (
        <div className={`${theme}-header-container`}>
          <div>
            <h1 className={`${theme}-header-head`}>User Management</h1>
          </div>

          <select
            value={theme}
            onChange={handleChange}
            className={`${theme}-theme-selector`}
          >
            <option value="dark">Dark Mode</option>
            <option value="light">Light Mode</option>
          </select>
        </div>
      )
    }}
  </ThemeContext.Consumer>
)

export default Header
