import { createContext, useContext, useState } from "react";

export type UserContextInfo = {
  id: string;
  sub: string;
  name: string;
  email: string;
  picture: null;
  given_name: null;
  updated_at: number;
  family_name: null;
  preferred_username: string;
};

export type AuthContextObj = {
  user: UserContextInfo | undefined;
  getUser: () => Promise<UserContextInfo | undefined>;
  login: () => Promise<void>;
  register: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextObj | undefined>(undefined);

// I couldnt figure out the type so i put any :(
export function AuthProvider({ children }: any) {
  const [user, setUser] = useState(undefined);
  async function getUser() {
    const res = await fetch("/api/status", { method: "GET" });
    if (res.status === 200) {
      const resJSON: UserContextInfo = await res.json();
      // setUser(resJSON)
      return resJSON;
    }
    return undefined;
  }

  async function login() {
    const res = await fetch("/api/login", { method: "GET" });
    const resJSON = await res.json();
    window.open(resJSON.redirectURL, "_blank", "noreferrer");
    return;
  }

  async function register() {
    const res = await fetch("/api/register", { method: "GET" });
    console.log(res);
    return;
  }

  async function logout() {
    const res = await fetch("/api/logout", { method: "GET" });
    const resJSON = await res.json();
    setUser(undefined);

    window.location.href = resJSON.redirectURL;
    return;
  }

  return (
    <AuthContext.Provider value={{ user, getUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const authContext = useContext(AuthContext);

  return authContext;
}
