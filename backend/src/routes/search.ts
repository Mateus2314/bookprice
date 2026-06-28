import { Hono } from "hono";
import { getDb } from "../db";
import { books, prices, platforms } from "../db/schema";
import { ilike, or, eq, and, desc } from "drizzle-orm";

const router = new Hono();

router.get("/", async (c) => {
  const db = getDb(c.env as any);
  const q = c.req.query("q");
  if (!q) return c.json({ results: [] });

  const found = await db.select().from(books).where(
    or(
      ilike(books.title, `%${q}%`),
      ilike(books.author, `%${q}%`),
      eq(books.isbn, q),
    )
  ).limit(20);

  const results = await Promise.all(found.map(async (book) => {
    const priceList = await db.select({
      platformName: platforms.name,
      platformSlug: platforms.slug,
      price: prices.price,
      url: prices.url,
      affiliateUrl: prices.affiliateUrl,
      currency: prices.currency,
    }).from(prices)
      .innerJoin(platforms, eq(prices.platformId, platforms.id))
      .where(and(
        eq(prices.bookId, book.id),
        eq(prices.inStock, 1),
      ))
      .orderBy(desc(prices.timestamp));

    const bestPrice = priceList.reduce((min, p) =>
      parseFloat(p.price) < parseFloat(min.price) ? p : min,
      priceList[0]
    );

    return {
      ...book,
      prices: priceList,
      bestPrice: bestPrice ? { platform: bestPrice.platformName, price: bestPrice.price, affiliateUrl: bestPrice.affiliateUrl } : null,
    };
  }));

  return c.json({ results });
});

export default router;
