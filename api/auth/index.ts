import {
  createKindeServerClient,
  GrantType,
  SessionManager,
  UserType,
} from "@kinde-oss/kinde-typescript-sdk";
import { createMiddleware } from "hono/factory";

let store: Record<string, unknown> = {};

export const sessionManager: SessionManager = {
  async getSessionItem(key: string) {
    return store[key];
  },
  async setSessionItem(key: string, value: unknown) {
    store[key] = value;
  },
  async removeSessionItem(key: string) {
    delete store[key];
  },
  async destroySession() {
    store = {};
  },
};

type Env = {
  Variables: {
    user: UserType;
  };
};

export const getUser = createMiddleware<Env>(async (c, next) => {
  try {
    const isAuth = await kindeClient.isAuthenticated(sessionManager);

    if (!isAuth) {
      return c.json({ error: "login required" }, 401);
    }
    const user = await kindeClient.getUserProfile(sessionManager);
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
