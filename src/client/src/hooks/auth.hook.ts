import { useState, useCallback, useEffect } from 'react'

interface UserInfo {
  token: string;
  userId: string;
}
const storageName = 'userData'

export const useAuth = () => {
  const [ready, setReady] = useState<boolean>(false)
  const [token, setToken] = useState<string | null>(null)
  
  const [userId, setUserId] = useState<string | null>(null)



  const login = useCallback((JWTToken: string, id: string) => {
    setToken(JWTToken);
    setUserId(id)

    localStorage.setItem(storageName, JSON.stringify({
      userId: id,
      token: JWTToken
    } as UserInfo ))
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUserId(null)

    localStorage.removeItem(storageName)
  }, [])

  useEffect(() => {
    const data: UserInfo | null = JSON.parse(localStorage.getItem(storageName) as string)

    if (data?.token) {
      login(data.token, data.userId)
    } 
    setReady(true)
  }, [login])

  return { login, logout, token, userId, ready }
}