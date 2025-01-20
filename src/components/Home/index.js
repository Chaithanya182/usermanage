import {Component} from 'react'
import {HashLoader} from 'react-spinners'
import ThemeContext from '../../context/ThemeContext'
import UserItem from '../UserItem'
import './index.css'

class Home extends Component {
  state = {
    users: [],
    filteredUsers: [],
    isLoading: true,
    searchInput: '',
    sortDirection: 'asc',
    currentPage: 1,
    itemsPerPage: 5,
    error: null,
  }

  componentDidMount() {
    this.getUsers()
  }

  getUsers = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users')

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      this.setState({users: data, filteredUsers: data, isLoading: false})
    } catch (error) {
      this.setState({error: error.message, isLoading: false})
    }
  }

  handleSearch = event => {
    const {users} = this.state
    const searchInput = event.target.value.toLowerCase()
    const filteredUsers = users.filter(user =>
      user.name.toLowerCase().includes(searchInput),
    )
    this.setState({searchInput, filteredUsers, currentPage: 1})
  }

  handleSort = event => {
    const {filteredUsers} = this.state
    const newDirection = event.target.value
    const sortedUsers = [...filteredUsers].sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return newDirection === 'asc' ? -1 : 1
      }
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return newDirection === 'asc' ? 1 : -1
      }
      return 0
    })
    this.setState({
      filteredUsers: sortedUsers,
      sortDirection: newDirection,
      currentPage: 1,
    })
  }

  handlePageChange = pageNumber => {
    this.setState({currentPage: pageNumber})
  }

  render() {
    const {
      filteredUsers,
      isLoading,
      searchInput,
      sortDirection,
      currentPage,
      itemsPerPage,
      error,
    } = this.state

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem)

    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)

    return (
      <ThemeContext.Consumer>
        {({theme}) => {
          if (isLoading) {
            return (
              <div className="loader-container">
                <HashLoader size={50} color="#36d7b7" />
              </div>
            )
          }

          if (error) {
            return (
              <div className={`error-container ${theme}`}>
                <h1 className="error-heading">Error</h1>
                <p className="error-message">{error}</p>
              </div>
            )
          }

          return (
            <div className={`home-container-${theme}`}>
              <div className={`controls-${theme}`}>
                <input
                  type="text"
                  placeholder="Search by name"
                  value={searchInput}
                  onChange={this.handleSearch}
                  className={`search-bar-${theme}`}
                />
                <select
                  onChange={this.handleSort}
                  value={sortDirection}
                  className={`sort-select-${theme}`}
                >
                  <option value="asc">Sort A-Z</option>
                  <option value="desc">Sort Z-A</option>
                </select>
              </div>

              <ul className={`user-list-${theme}`}>
                {currentItems.map(user => (
                  <UserItem each={user} key={user.id} />
                ))}
              </ul>

              <div className={`pagination-${theme}`}>
                <button
                  className={`button-${theme}`}
                  type="button"
                  onClick={() => this.handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span className={`span-${theme}`}>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  className={`button-${theme}`}
                  type="button"
                  onClick={() => this.handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Home
