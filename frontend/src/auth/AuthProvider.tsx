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
  getLoginURL: () => Promise<void>;
  getRegisterURL: () => Promise<void>;
  getLogoutURL: () => Promise<void>;
};

const AuthContext = createContext<AuthContextObj | undefined>(undefined);

// I couldnt figure out the type so i put any :(
export function AuthProvider({ children }: any) {
  const [user, setUser] = useState(undefined);
  async function getUser() {
    const res = await fetch("/api/status", { method: "GET" });
      console.log(res)
    if (res.status === 200) {
      const resJSON: UserContextInfo = await res.json();
      // setUser(resJSON)
      return resJSON;
    }
    return undefined;
  }

  async function getLoginURL() {
    const res = await fetch("/api/login", { method: "GET" });
    const resJSON = await res.json();
    return resJSON.redirectURL;
  }

  async function getRegisterURL() {
    const res = await fetch("/api/register", { method: "GET" });
    const resJSON = await res.json();
    return resJSON.redirectURL;
  }

  async function getLogoutURL() {
    const res = await fetch("/api/logout", { method: "GET" });
    const resJSON = await res.json();
    setUser(undefined);
    return resJSON.redirectURL;
  }

  return (
    <AuthContext.Provider
      value={{ user, getUser, getLoginURL, getRegisterURL, getLogoutURL }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const authContext = useContext(AuthContext);

  return authContext;
}
