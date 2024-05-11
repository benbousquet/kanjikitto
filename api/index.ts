import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { logger } from "hono/logger";
import { usersRoute } from "./routes/users";
import { decksRoute } from "./routes/decks";
import { authRoute } from "./routes/auth";

const app = new Hono();

app.use(logger());

app.get("/ping", (c) => {
  return c.text("pong");
});

app.route("/api/decks", decksRoute);
app.route("/api/users", usersRoute);
app.route("/api", authRoute);

app.get('*', serveStatic({root: '../frontend/dist'}))
app.get('*', serveStatic({path: '../frontend/dist/index.html'}))

export default app;