import React, { useState, useCallback, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import { LinkCard } from './../components/LinkCard'
import { Loader } from '../components/Loader'

export interface LinkObj {
  _id: string,
  clicks: number,
  code: string,
  to: string,
  from: string,  
  owner: string,
  date: string,
  __v: number
}
export const DetailPage = () => {
  const { token } = useContext(AuthContext)
  const { request, loading } = useHttp()
  const [link, setLink] = useState<LinkObj>()
  const linkID = useParams<{id: string}>().id

  const getLink = useCallback(async () => {
      try {
        const fetched: LinkObj = await request(`/api/link/${linkID}`, 'GET', null, {
          Authorization: `Bearer ${token}`
        })
        setLink(fetched)
      } catch (e) {}
    }, [linkID, request, token],
  )
  useEffect(() => {
    getLink()
  }, [getLink])
  if (loading) {
    return <Loader />
  }
  return (
    <>
      { !loading && link && <LinkCard link={link} />}
    </>
  )
}
