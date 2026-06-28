import { pgTable, serial, text, integer, decimal, timestamp, index } from "drizzle-orm/pg-core";

export const books = pgTable("books", {
  id: serial("id").primaryKey(),
  isbn: text("isbn").notNull().unique(),
  title: text("title").notNull(),
  author: text("author").notNull(),
  publisher: text("publisher"),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const platforms = pgTable("platforms", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  affiliateProgramUrl: text("affiliate_program_url"),
  active: integer("active").default(1).notNull(),
});

export const prices = pgTable("prices", {
  id: serial("id").primaryKey(),
  bookId: integer("book_id").references(() => books.id).notNull(),
  platformId: integer("platform_id").references(() => platforms.id).notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  url: text("url").notNull(),
  affiliateUrl: text("affiliate_url"),
  currency: text("currency").default("BRL").notNull(),
  inStock: integer("in_stock").default(1).notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
}, (table) => ({
  bookPlatformIdx: index("idx_prices_book_platform").on(table.bookId, table.platformId),
}));

export const priceHistory = pgTable("price_history", {
  id: serial("id").primaryKey(),
  bookId: integer("book_id").references(() => books.id).notNull(),
  platformId: integer("platform_id").references(() => platforms.id).notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
}, (table) => ({
  bookPlatformTimeIdx: index("idx_history_book_platform_time").on(table.bookId, table.platformId, table.timestamp),
}));
