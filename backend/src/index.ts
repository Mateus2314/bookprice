import { Hono } from "hono";
import { cors } from "hono/cors";
import booksRouter from "./routes/books";
import pricesRouter from "./routes/prices";
import searchRouter from "./routes/search";

const app = new Hono();

app.use("/*", cors({
  origin: "*",
  allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));

app.get("/", (c) => c.json({ name: "BookPrice API", version: "1.0.0" }));

app.route("/api/books", booksRouter);
app.route("/api/prices", pricesRouter);
app.route("/api/search", searchRouter);

app.onError((err, c) => {
  console.error(err);
  return c.json({ error: err.message || "Internal Server Error" }, 500);
});

export default app;
