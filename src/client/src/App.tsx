import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { useRoutes } from './routes'
import { useAuth } from './hooks/auth.hook'
import { AuthContext } from './context/AuthContext'
import { Navbar } from './components/Navbar'
import { Loader } from './components/Loader'
import 'materialize-css'


const App = () => {
  const { login, logout, token, userId, ready } = useAuth()
  let isAuthenticated: boolean = !!token
  const routes: JSX.Element = useRoutes(isAuthenticated)

  if (!ready) {
    return <Loader />
  }
  return (
    <AuthContext.Provider value={{
      login, logout, userId, token, isAuthenticated
    }}>
      <Router>
        { isAuthenticated && <Navbar /> }
        <div className="container">
          { routes }
        </div>
      </Router>
    </AuthContext.Provider>

  );
}

export  { App };
