CREATE TABLE "cyclemetric"."activities" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "cyclemetric"."activities_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"type" varchar NOT NULL,
	"user_id" integer NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "cyclemetric"."track-points" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "cyclemetric"."track-points_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"activity_id" integer NOT NULL,
	"latitude" integer NOT NULL,
	"longitude" integer NOT NULL,
	"speed" integer NOT NULL,
	"accuracy" integer NOT NULL,
	"altitude" integer NOT NULL,
	"altitudeAccuracy" integer NOT NULL,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "cyclemetric"."users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "cyclemetric"."users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"login" varchar NOT NULL UNIQUE,
	"password" varchar NOT NULL,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "cyclemetric"."activities" ADD CONSTRAINT "activities_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "cyclemetric"."users"("id");--> statement-breakpoint
ALTER TABLE "cyclemetric"."track-points" ADD CONSTRAINT "track-points_activity_id_activities_id_fkey" FOREIGN KEY ("activity_id") REFERENCES "cyclemetric"."activities"("id");