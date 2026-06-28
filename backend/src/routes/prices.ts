import { Hono } from "hono";
import { getDb } from "../db";
import { prices, priceHistory, books, platforms } from "../db/schema";
import { eq, and, desc } from "drizzle-orm";

const router = new Hono();

router.get("/:isbn", async (c) => {
  const db = getDb(c.env as any);
  const isbn = c.req.param("isbn");

  const book = await db.select({ id: books.id }).from(books).where(eq(books.isbn, isbn)).limit(1);
  if (!book.length) return c.json({ error: "Book not found" }, 404);

  const currentPrices = await db.select({
    platform: platforms.name,
    platformSlug: platforms.slug,
    price: prices.price,
    url: prices.url,
    affiliateUrl: prices.affiliateUrl,
    currency: prices.currency,
    inStock: prices.inStock,
    updatedAt: prices.timestamp,
  }).from(prices)
    .innerJoin(platforms, eq(prices.platformId, platforms.id))
    .where(eq(prices.bookId, book[0].id))
    .orderBy(desc(prices.timestamp));

  const history = await db.select({
    platform: platforms.name,
    price: priceHistory.price,
    timestamp: priceHistory.timestamp,
  }).from(priceHistory)
    .innerJoin(platforms, eq(priceHistory.platformId, platforms.id))
    .where(eq(priceHistory.bookId, book[0].id))
    .orderBy(desc(priceHistory.timestamp))
    .limit(200);

  return c.json({ isbn, currentPrices, history });
});

export default router;
