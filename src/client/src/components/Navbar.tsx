import React, { useContext } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { AuthContext } from './../context/AuthContext'

export const Navbar = () => {
  const history = useHistory()
  const { logout } = useContext(AuthContext)
  const logoutHandler = (event: React.MouseEvent<HTMLAnchorElement , MouseEvent>) => {
    event.preventDefault()
    logout()
    history.push("/")
  }
  return (
    <nav>
      <div className="nav-wrapper blue darken-3">
        <span className="brand-logo left">Cut URL's</span>
        <ul id="nav-mobile" className="right">
          <li><NavLink to="/create">Create</NavLink></li>
          <li><NavLink to="/Links">Links</NavLink></li>
          <li><a href="/" onClick={(e) => logoutHandler(e)}>Logout</a></li>
        </ul>
      </div>
    </nav>
  )
}
