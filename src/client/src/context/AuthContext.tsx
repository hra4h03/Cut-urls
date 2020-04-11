import { createContext } from 'react'
interface UserContext {
  token: null | string;
  userId: null | string;
  login: Function;
  logout: Function;
  isAuthenticated?: boolean;
}

export const AuthContext = createContext<UserContext>({
  token: null,
  userId: null,
  login: Function,
  logout: Function,
  isAuthenticated: false
})