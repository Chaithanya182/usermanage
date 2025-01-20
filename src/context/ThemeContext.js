import React from 'react'

const ThemeContext = React.createContext({
  theme: 'light',
  onChangeTheme: () => {},
})

export default ThemeContext
