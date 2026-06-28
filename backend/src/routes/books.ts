import { Hono } from "hono";
import { getDb } from "../db";
import { books } from "../db/schema";
import { eq, ilike, or } from "drizzle-orm";
import { z } from "zod";
import { zValidator } from "../middleware";

const router = new Hono();

router.get("/", async (c) => {
  const db = getDb(c.env as any);
  const q = c.req.query("q");
  if (!q) {
    const all = await db.select().from(books).limit(50);
    return c.json(all);
  }
  const results = await db.select().from(books).where(
    or(
      ilike(books.title, `%${q}%`),
      ilike(books.author, `%${q}%`),
      eq(books.isbn, q),
    )
  ).limit(50);
  return c.json(results);
});

router.get("/:isbn", async (c) => {
  const db = getDb(c.env as any);
  const isbn = c.req.param("isbn");
  const book = await db.select().from(books).where(eq(books.isbn, isbn)).limit(1);
  if (!book.length) return c.json({ error: "Book not found" }, 404);
  return c.json(book[0]);
});

router.post("/", zValidator("json", z.object({
  isbn: z.string(),
  title: z.string(),
  author: z.string(),
  publisher: z.string().optional(),
  imageUrl: z.string().optional(),
})), async (c) => {
  const db = getDb(c.env as any);
  const body = await c.req.valid("json");
  const existing = await db.select().from(books).where(eq(books.isbn, body.isbn)).limit(1);
  if (existing.length) return c.json(existing[0]);
  const [book] = await db.insert(books).values(body).returning();
  return c.json(book, 201);
});

export default router;
