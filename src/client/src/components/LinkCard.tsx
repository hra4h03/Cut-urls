import React from 'react'
import { LinkObj } from './../views/DetailPage'

export const LinkCard = ({ link }: {link: LinkObj}) => {
  // ref="noopener noreferrer"
// ref="noopener noreferrer"
  return (
    <div>
      <h2>Link</h2>
      <p>Your link: <a href={link.to} target="_blank" rel="noopener noreferrer">{link.to}</a></p>
      <p>Where: <a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a></p>
      <p>Clicks in this link: <strong>  {link.clicks}</strong></p>
      <p>Date: <strong>{new Date(link.date).toLocaleDateString()}</strong></p>
    </div>
  )
}
