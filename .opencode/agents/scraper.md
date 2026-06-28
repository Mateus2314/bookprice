# scraper subagent

Playwright web scraping specialist for BookPrice.

Extract book prices, titles, authors, and availability from Brazilian book platforms.

**Platforms to support (in order):**
1. Amazon Brasil — PAAPI (official API) + Playwright fallback
2. Shopee Brasil — Playwright scraping
3. Magazine Luiza — Playwright scraping
4. Submarino / Americanas — Playwright scraping
5. Future platforms as needed

**Conventions:**
- Each platform gets its own module in `backend/src/scrapers/`
- Return normalized data: `{ title, author, isbn, price, url, currency, platform }`
- Handle rate limiting and CAPTCHAs gracefully
- Use affiliate link generation when available
- Log failures with platform name + reason
