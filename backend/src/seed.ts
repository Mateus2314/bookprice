import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./db/schema";

const connStr = process.env.NEON_DATABASE_URL;
if (!connStr) { console.error("NEON_DATABASE_URL não definida"); process.exit(1); }
const sql = postgres(connStr, { prepare: false });
const db = drizzle(sql, { schema });

const sampleBooks = [
  { isbn: "9788532510116", title: "Harry Potter e a Pedra Filosofal", author: "J.K. Rowling", publisher: "Rocco", imageUrl: "https://m.media-amazon.com/images/I/71-9S4vMRxL._SY466_.jpg" },
  { isbn: "9788535914843", title: "1984", author: "George Orwell", publisher: "Companhia das Letras", imageUrl: "https://m.media-amazon.com/images/I/91hGq5kNldL._SY466_.jpg" },
  { isbn: "9788595084713", title: "O Hobbit", author: "J.R.R. Tolkien", publisher: "HarperCollins", imageUrl: "https://m.media-amazon.com/images/I/91FAHZYFD6L._SY466_.jpg" },
  { isbn: "9788577992849", title: "Dom Casmurro", author: "Machado de Assis", publisher: "BestBolso", imageUrl: "https://m.media-amazon.com/images/I/71zVZvbUgqL._SY466_.jpg" },
  { isbn: "9788556510653", title: "A Guerra dos Tronos", author: "George R.R. Martin", publisher: "Suma", imageUrl: "https://m.media-amazon.com/images/I/91G9hRMBVjL._SY466_.jpg" },
  { isbn: "9788522008959", title: "O Pequeno Príncipe", author: "Antoine de Saint-Exupéry", publisher: "Agir", imageUrl: "https://m.media-amazon.com/images/I/81wO3LQYOBL._SY466_.jpg" },
  { isbn: "9788535914904", title: "A Revolução dos Bichos", author: "George Orwell", publisher: "Companhia das Letras", imageUrl: "https://m.media-amazon.com/images/I/61owG48crZL._SY466_.jpg" },
  { isbn: "9788582850020", title: "Orgulho e Preconceito", author: "Jane Austen", publisher: "Penguin", imageUrl: "https://m.media-amazon.com/images/I/71fFy1XnDKL._SY466_.jpg" },
  { isbn: "9788501012322", title: "Cem Anos de Solidão", author: "Gabriel García Márquez", publisher: "Record", imageUrl: "https://m.media-amazon.com/images/I/81b5qNXOeVL._SY466_.jpg" },
  { isbn: "9788595084782", title: "O Senhor dos Anéis: A Sociedade do Anel", author: "J.R.R. Tolkien", publisher: "HarperCollins", imageUrl: "https://m.media-amazon.com/images/I/91TgNGB6osL._SY466_.jpg" },
  { isbn: "9788521004563", title: "Grande Sertão: Veredas", author: "João Guimarães Rosa", publisher: "Nova Fronteira", imageUrl: "https://m.media-amazon.com/images/I/71fYbXZzGAL._SY466_.jpg" },
  { isbn: "9788543104564", title: "Moby Dick", author: "Herman Melville", publisher: "Penguin", imageUrl: "https://m.media-amazon.com/images/I/81n1R0v4S.L._SY466_.jpg" },
  { isbn: "9788556510691", title: "O Problema dos Três Corpos", author: "Cixin Liu", publisher: "Suma", imageUrl: "https://m.media-amazon.com/images/I/91otJ1W8EeL._SY466_.jpg" },
  { isbn: "9788551003486", title: "Projeto Hail Mary", author: "Andy Weir", publisher: "Intrínseca", imageUrl: "https://m.media-amazon.com/images/I/81YmzJGNecL._SY466_.jpg" },
  { isbn: "9788582860130", title: "A Biblioteca da Meia-Noite", author: "Matt Haig", publisher: "Bertrand Brasil", imageUrl: "https://m.media-amazon.com/images/I/81I5bIqD7wL._SY466_.jpg" },
  { isbn: "9788535934056", title: "O Livro dos Humanos", author: "João Moreira Salles", publisher: "Companhia das Letras", imageUrl: "https://m.media-amazon.com/images/I/71gGbxUB-eL._SY466_.jpg" },
];

const priceRanges: Record<string, [number, number]> = {
  amazon: [25, 55],
  shopee: [18, 45],
  magalu: [22, 50],
  submarino: [20, 48],
  americanas: [19, 47],
};

function randPrice(min: number, max: number): number {
  return Math.round((Math.random() * (max - min) + min) * 100) / 100;
}

function generateUrl(isbn: string, slug: string): { url: string; affiliateUrl: string | null } {
  const urls: Record<string, { url: string; affiliate: string | null }> = {
    amazon: { url: `https://www.amazon.com.br/dp/${isbn}`, affiliate: `https://www.amazon.com.br/dp/${isbn}?tag=bookprice-20` },
    shopee: { url: `https://shopee.com.br/search?keyword=${isbn}`, affiliate: `https://shopee.com.br/search?keyword=${isbn}&afid=bookprice` },
    magalu: { url: `https://www.magazineluiza.com.br/busca/${isbn}/`, affiliate: `https://www.magazineluiza.com.br/busca/${isbn}/?partner_id=bookprice` },
    submarino: { url: `https://www.submarino.com.br/busca/${isbn}`, affiliate: null },
    americanas: { url: `https://www.americanas.com.br/busca/${isbn}`, affiliate: null },
  };
  return urls[slug] || { url: `https://www.google.com/search?q=${isbn}`, affiliate: null };
}

async function seed() {
  const existing = await db.select({ id: schema.books.id }).from(schema.books).limit(1);
  if (existing.length > 0) {
    console.log("Banco já populado — pulando seed.");
    await sql.end();
    return;
  }

  const platforms = await db.select().from(schema.platforms);
  const platformMap = new Map(platforms.map((p) => [p.slug, p]));

  const pricesBatch: (typeof schema.prices.$inferInsert)[] = [];
  const historyBatch: (typeof schema.priceHistory.$inferInsert)[] = [];

  console.log("Inserindo livros...");
  for (const book of sampleBooks) {
    const [inserted] = await db.insert(schema.books).values(book).returning();

    for (const [slug, [min, max]] of Object.entries(priceRanges)) {
      const platform = platformMap.get(slug);
      if (!platform) continue;

      const price = randPrice(min, max);
      const urls = generateUrl(book.isbn, slug);

      pricesBatch.push({
        bookId: inserted.id,
        platformId: platform.id,
        price: price.toFixed(2),
        url: urls.url,
        affiliateUrl: urls.affiliate,
        currency: "BRL",
        inStock: Math.random() > 0.1 ? 1 : 0,
      });

      let hp = price;
      for (let w = 0; w <= 90; w += 7) {
        historyBatch.push({
          bookId: inserted.id,
          platformId: platform.id,
          price: hp.toFixed(2),
          timestamp: new Date(Date.now() - w * 86400000),
        });
        hp = Math.max(10, Math.round((hp + (Math.random() - 0.5) * 10) * 100) / 100);
      }
    }
    console.log(`  ✓ ${book.title}`);
  }

  console.log("Inserindo preços...");
  for (let i = 0; i < pricesBatch.length; i += 50) {
    await db.insert(schema.prices).values(pricesBatch.slice(i, i + 50));
  }

  console.log("Inserindo histórico...");
  for (let i = 0; i < historyBatch.length; i += 100) {
    await db.insert(schema.priceHistory).values(historyBatch.slice(i, i + 100));
  }

  console.log(`Seed concluído! ${sampleBooks.length} livros, ${pricesBatch.length} preços, ${historyBatch.length} históricos.`);
  await sql.end();
}

seed().catch((err) => {
  console.error("Erro no seed:", err);
  process.exit(1);
});
