import { Hono } from "hono";

export const usersRoute = new Hono()
  .get("/:id", (c) => {
    const id = c.req.param("id");
    return c.json({ hello: id });
  })
  .post("/", (c) => {
    return c.json({ hello: "oo"})
  });
