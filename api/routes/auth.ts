import { Hono } from "hono";
import { getUser, kindeClient, sessionManager } from "../auth";

export const authRoute = new Hono()
  .get("/login", async (c) => {
    const loginUrl = await kindeClient.login(sessionManager(c));
    return c.json({ redirectURL: loginUrl.toString() });
  })
  .get("/register", async (c) => {
    const registerUrl = await kindeClient.register(sessionManager(c));
    return c.json({ redirectURL: registerUrl.toString() });
  })
  .get("/callback", async (c) => {
    const url = new URL(c.req.url);
    await kindeClient.handleRedirectToApp(sessionManager(c), url as URL);
    return c.redirect("/");
  })
  .get("/logout", async (c) => {
    const logoutUrl = await kindeClient.logout(sessionManager(c));
    return c.json({ redirectURL: logoutUrl.toString() });
  })
  .get("/status", getUser, async (c) => {
    return c.json(c.var.user);
  });
