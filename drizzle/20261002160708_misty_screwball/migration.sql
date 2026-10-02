CREATE TABLE "cyclemetric"."activities" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "cyclemetric"."activities_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"createdAt" date DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "cyclemetric"."track-points" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "cyclemetric"."track-points_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"activity_id" integer NOT NULL,
	"createdAt" date,
	"latitude" integer NOT NULL,
	"longitude" integer NOT NULL,
	"speed" integer,
	"accuracy" integer,
	"altitude" integer,
	"altitudeAccuracy" integer
);
--> statement-breakpoint
ALTER TABLE "cyclemetric"."track-points" ADD CONSTRAINT "track-points_activity_id_activities_id_fkey" FOREIGN KEY ("activity_id") REFERENCES "cyclemetric"."activities"("id");