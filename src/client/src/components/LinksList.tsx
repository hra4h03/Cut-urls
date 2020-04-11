import React from 'react'
import { Link } from 'react-router-dom'
import { LinkObj } from '../views/DetailPage'

export const LinksList = ({ links }: {links: LinkObj[]} ) => {
  if (!links.length) {
    return <p style={{ display: 'flex', justifyContent: 'center' }}>No links yet</p>
  }
  return (
    <div>
       <table>
        <thead>
          <tr>
              <th>Number</th>
              <th>Original</th>
              <th>Cutted</th>
              <th>Open</th>
          </tr>
        </thead>

        <tbody>
          { links.map((link: LinkObj, index) => {
            return (
              <tr key={link._id}>
                <td>{index + 1}</td>
                <td>{ link.from }</td>
                <td>{ link.to }</td>
                <td>
                  <Link to={`detail/${link._id}`} >Open</Link>
                </td>
              </tr>  
            )
          }) }
        </tbody>
      </table>
    </div>
  )
}
