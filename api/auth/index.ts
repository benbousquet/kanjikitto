import {
  createKindeServerClient,
  GrantType,
  SessionManager,
  UserType,
} from "@kinde-oss/kinde-typescript-sdk";
import { Context } from "hono";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";

export const sessionManager = (c: Context): SessionManager => ({
  async getSessionItem(key: string) {
    const session =  getCookie(c, key);
    return session;
  },
  async setSessionItem(key: string, value: unknown) {
    setCookie(c, key, value as string, {
      httpOnly: true,
      secure: true,
      sameSite: "Lax",
    });
  },
  async removeSessionItem(key: string) {
    deleteCookie(c, key);
  },
  async destroySession() {
    deleteCookie(c, "id_token");
    deleteCookie(c, "access_token");
    deleteCookie(c, "user");
    deleteCookie(c, "refresh_token");
  },
});

type Env = {
  Variables: {
    user: UserType;
  };
};

export const getUser = createMiddleware<Env>(async (c, next) => {
  try {
    const isAuth = await kindeClient.isAuthenticated(sessionManager(c));

    if (!isAuth) {
      return c.json({ error: "login required" }, 401);
    }
    const user = await kindeClient.getUserProfile(sessionManager(c));
    c.set("user", user);
    await next();
  } catch (e) {
    console.error(e);
    return c.json({ error: "authentication failed" }, 401);
  }
});

export const kindeClient = createKindeServerClient(
  GrantType.AUTHORIZATION_CODE,
  {
    authDomain: process.env.KINDE_DOMAIN as string,
    clientId: process.env.KINDE_CLIENT_ID as string,
    clientSecret: process.env.KINDE_CLIENT_SECRET as string,
    redirectURL: process.env.KINDE_REDIRECT_URI as string,
    logoutRedirectURL: process.env.KINDE_LOGOUT_REDIRECT_URI as string,
  }
);
