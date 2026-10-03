CREATE TABLE "cyclemetric"."users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "cyclemetric"."users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"login" varchar NOT NULL,
	"password" varchar NOT NULL,
	"createdAt" date DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "cyclemetric"."activities" ADD COLUMN "user_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "cyclemetric"."activities" ADD CONSTRAINT "activities_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "cyclemetric"."users"("id");