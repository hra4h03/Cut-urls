import React, {useState, useContext, useCallback, useEffect} from 'react'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import { LinkObj } from './DetailPage'
import { Loader } from '../components/Loader'
import { LinksList } from '../components/LinksList'
export const LinksPage = () => {
  const [links, setLinks] = useState<LinkObj[]>([])
  const { loading, request } = useHttp()
  const { token } = useContext(AuthContext)

  const fetchLinks = useCallback(async () => {
    try {
      const fetched: LinkObj[] = await request('/api/link', 'GET', null, {
        Authorization : `Bearer ${token}`
      })
      setLinks(fetched)
    } catch (e) {}
  }, [token, request])

  useEffect(() => {
    fetchLinks()
  }, [fetchLinks])
  if (loading) {
    return <Loader />
  }
  return (
    <div>
      { !loading && <LinksList links={links} /> }
    </div>
  )
}
