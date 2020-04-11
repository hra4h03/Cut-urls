import React, { useState, useContext } from 'react'
import { useHttp } from '../hooks/http.hook'
import {AuthContext} from './../context/AuthContext'
import { useHistory } from 'react-router-dom'

export const CreateLinks = () => {
  const history = useHistory()
  const Auth = useContext(AuthContext)
  const [link, setLink] = useState('')
  const { request } = useHttp()
  const pressHandler = async (event: any) => {
    if (event.key === 'Enter') {
      try {
       const data = await request('/api/link/generate', 'POST', { from: link }, {
         Authorization: `Bearer ${Auth.token}`
       })
       console.log(data)
       history.push(`/detail/${data.link._id}`)
      } catch (e) {}
    }
  }
  return (
    <div className="row">
      <div className="col s8 offset-s2" style={{ paddingTop: '2rem' }}>
        <div className="input-field">
          <input 
            placeholder="set Link"
            id="link" 
            type="text"
            value={link}
            className="validate yellow-input" 
            onChange={e => setLink(e.target.value)}
            onKeyPress={pressHandler}
          />
          <label htmlFor="link">Email</label>
        </div>
      </div>
    </div>
  )
}
