import React, { useState, useEffect, useContext } from 'react'
import { useHttp } from './../hooks/http.hook'
import { useMessage } from "./../hooks/message.hook";
import { AuthContext } from '../context/AuthContext';

export interface Register {
  email: string;
  password: string;
}

export const Auth = (): JSX.Element => {
  const Auth = useContext(AuthContext)
  const { loading, request, error, clearError } = useHttp()
  const message = useMessage()
  const [form, setForm] = useState<Register>({
    email: "",
    password: ""
  })

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  const changeHandle = ( event: React.ChangeEvent<HTMLInputElement> ) => {
    setForm({ ...form, [event.target.name ]: event.target.value })
  }
  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', {...form})
      message(data.message)
    } catch (e) {}
  }
  const loginHandler = async () => {
    try {
      const { token, userId } = await request('/api/auth/login', 'POST', {...form})
      Auth.login( token, userId)
    } catch (e) {}
  }

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Cut URL's</h1>
        <div className="card blue darken-1">
        <div className="card-content white-text">
          <span className="card-title">Authentication</span>
          <div className="row">
            <div className="input-field col m12">
              <input 
                id="email" 
                type="email"
                name="email"
                className="validate yellow-input" 
                value={form.email}
                onChange={e => changeHandle(e)}
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className="input-field col m12">
              <input 
                value={form.password}
                id="password"
                type="password" 
                name="password"
                className="validate yellow-input"
                onChange={e => changeHandle(e)}
              />
              <label htmlFor="password">Password</label>
            </div>
          </div>
        </div>
        <div className="card-action ">
          <button 
            className="btn yellow darken-4"
            onClick={loginHandler}
            disabled={loading}
          >Sign in</button>
          <button 
            onClick={registerHandler}
            disabled={loading}
            className="btn grey lighten-1"
          >Sign up</button>
        </div>
      </div>
      </div>
    </div>
  )
}
