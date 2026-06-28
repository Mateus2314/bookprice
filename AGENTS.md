# BookPrice - Project Guide

## Stack
- **Frontend:** React + Vite + TypeScript + Tailwind CSS → Cloudflare Pages
- **Backend:** Hono (TypeScript) → Cloudflare Workers
- **Database:** Neon PostgreSQL + Drizzle ORM
- **Scraping:** Playwright
- **Design:** Pencil (.pen files)

## Project Structure
```
bookprice/
├── frontend/          # React app (Cloudflare Pages)
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Page components
│   │   └── types.ts      # TypeScript types
│   └── package.json
├── backend/           # Hono API (Cloudflare Workers)
│   ├── src/
│   │   ├── routes/       # API route handlers
│   │   ├── scrapers/     # Price scrapers per platform
│   │   ├── db/           # Drizzle schema + connection
│   │   └── index.ts      # Worker entry point
│   ├── migrations/       # Drizzle SQL migrations
│   └── wrangler.toml
├── designs/           # Pencil .pen files
└── opencode.json      # OpenCode config
```

## API Endpoints
- `GET /` - Health check
- `GET /api/search?q=query` - Search books
- `GET /api/books` - List books
- `GET /api/books/:isbn` - Get book details
- `POST /api/books` - Create book
- `GET /api/prices/:isbn` - Get prices + history for a book

## Development
- **Backend:** `cd backend && npm run dev` (starts wrangler dev on :8787)
- **Frontend:** `cd frontend && npm run dev` (starts Vite on :5173)
- **DB migrations:** `cd backend && npm run db:generate && npm run db:migrate`
- **Deploy:** Use cloudflare agent (`use cloudflare`)

## MCP Servers
- `neon` - Database management
- `cloudflare` - Cloudflare infra (Workers, Pages, CRON)
- `playwright` - Web scraping (browser automation)
- `pencil` - Design file editor
