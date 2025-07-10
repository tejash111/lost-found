CREATE TABLE "accounts" (
	"id" varchar(225) PRIMARY KEY NOT NULL,
	"user_id" varchar(225) NOT NULL,
	"account_id" varchar(225) NOT NULL,
	"provider_id" varchar(225) NOT NULL,
	"password" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "found" (
	"id" serial PRIMARY KEY NOT NULL,
	"item" varchar(225) NOT NULL,
	"location" varchar(225) NOT NULL,
	"description" varchar(225) NOT NULL,
	"slug" varchar(225) NOT NULL,
	"client_id" varchar(225) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "found_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" varchar(225) PRIMARY KEY NOT NULL,
	"user_id" varchar(225) NOT NULL,
	"token" varchar(225),
	"expires_at" timestamp NOT NULL,
	"ip_address" varchar(225),
	"user_agent" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" varchar(225) PRIMARY KEY NOT NULL,
	"name" varchar(225) NOT NULL,
	"email" varchar(225) NOT NULL,
	"email_verified" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "found" ADD CONSTRAINT "found_client_id_users_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;