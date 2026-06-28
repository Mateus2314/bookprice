CREATE TABLE "books" (
	"id" serial PRIMARY KEY NOT NULL,
	"isbn" text NOT NULL,
	"title" text NOT NULL,
	"author" text NOT NULL,
	"publisher" text,
	"image_url" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "books_isbn_unique" UNIQUE("isbn")
);
--> statement-breakpoint
CREATE TABLE "platforms" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"affiliate_program_url" text,
	"active" integer DEFAULT 1 NOT NULL,
	CONSTRAINT "platforms_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "price_history" (
	"id" serial PRIMARY KEY NOT NULL,
	"book_id" integer NOT NULL,
	"platform_id" integer NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"timestamp" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "prices" (
	"id" serial PRIMARY KEY NOT NULL,
	"book_id" integer NOT NULL,
	"platform_id" integer NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"url" text NOT NULL,
	"affiliate_url" text,
	"currency" text DEFAULT 'BRL' NOT NULL,
	"in_stock" integer DEFAULT 1 NOT NULL,
	"timestamp" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "price_history" ADD CONSTRAINT "price_history_book_id_books_id_fk" FOREIGN KEY ("book_id") REFERENCES "public"."books"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "price_history" ADD CONSTRAINT "price_history_platform_id_platforms_id_fk" FOREIGN KEY ("platform_id") REFERENCES "public"."platforms"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "prices" ADD CONSTRAINT "prices_book_id_books_id_fk" FOREIGN KEY ("book_id") REFERENCES "public"."books"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "prices" ADD CONSTRAINT "prices_platform_id_platforms_id_fk" FOREIGN KEY ("platform_id") REFERENCES "public"."platforms"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_history_book_platform_time" ON "price_history" USING btree ("book_id","platform_id","timestamp");--> statement-breakpoint
CREATE INDEX "idx_prices_book_platform" ON "prices" USING btree ("book_id","platform_id");