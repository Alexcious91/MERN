import { createContext } from "react"

const defaultValues = { 
   token: null,
   userId: null,
   login: (token, userId, tokenExpiration) => {},
   logout: () => {}
}

const AuthContext = createContext(defaultValues)

export default AuthContext