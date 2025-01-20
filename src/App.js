import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Header from './components/Header'
import NotFound from './components/NotFound'
import UserDetail from './components/UserDetail'
import ThemeContext from './context/ThemeContext'
import './App.css'

class App extends React.Component {
  state = {theme: 'light'}

  onChangeTheme = changeValue => {
    this.setState({theme: changeValue})
  }

  render() {
    const {theme} = this.state
    return (
      <ThemeContext.Provider value={{theme, onChangeTheme: this.onChangeTheme}}>
        <div className={`app-container-${theme}`}>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/users/:id" element={<UserDetail />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </div>
      </ThemeContext.Provider>
    )
  }
}

export default App
