import {createContext, Dispatch, PropsWithChildren, SetStateAction, use, useEffect, useState} from "react";
import useLocalStorage from "../hooks/useLocalStorage.ts";

export const TOKEN_KEY = "token";

export type AuthContextProps = {
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
}

export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  token: '',
  setToken: () => {},
})

export const useAuthContext = () => {
  const context = use<AuthContextProps>(AuthContext);
  if (!context) throw new Error('useAuthContext must be used within AuthContext');
  return context;
}

export const AuthProvider = ({children}: PropsWithChildren) => {
  const [value, setValue] = useLocalStorage(TOKEN_KEY, null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!value)
  const [token, setToken] = useState(value);

  useEffect(() => {
    if(token === value) return;
    if(!token) setIsAuthenticated(false)
    setValue(token)
  }, [token])

  return (
    <AuthContext value={{isAuthenticated, setIsAuthenticated, token, setToken}}>
      {children}
    </AuthContext>
  )
}
