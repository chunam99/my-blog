import { createContext, ReactNode, useState, useCallback } from "react";
import UserLogin from "../models/UserLogin";
import { login } from "../services/Service";

interface AuthContextProps {
  user: UserLogin;
  handleLogout(): void;
  handleLogin(userLogin: UserLogin): Promise<void>;
  isLoading: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserLogin>({
    id: 0,
    name: "Paul Chu",
    username: "paulchu.2302@gmail.com",
    photo: "",
    password: "123123",
    token: "123123",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = useCallback(async (userLogin: UserLogin) => {
    setIsLoading(true);
    try {
      await login(`/users/login`, userLogin, setUser);
    } catch (error) {
      console.error("Login error:", error);
      alert("Invalid user credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleLogout = useCallback(() => {
    setUser({
      id: 0,
      name: "",
      username: "",
      photo: "",
      password: "",
      token: "",
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, handleLogin, handleLogout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}
