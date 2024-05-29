CREATE TABLE IF NOT EXISTS "tbl_ocean" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"latitude_min" double precision NOT NULL,
	"longitude_min)" double precision NOT NULL,
	"latitude_max" double precision NOT NULL,
	"longitude_max)" double precision NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "tbl_ocean_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tbl_robot" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"latitude" double precision NOT NULL,
	"longitude" double precision NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"robot_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tbl_ocean_trash" (
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"ocean_id" uuid NOT NULL,
	"trash_id" uuid NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tbl_robot" ADD CONSTRAINT "tbl_robot_robot_id_tbl_robot_id_fk" FOREIGN KEY ("robot_id") REFERENCES "public"."tbl_robot"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tbl_ocean_trash" ADD CONSTRAINT "tbl_ocean_trash_ocean_id_tbl_ocean_id_fk" FOREIGN KEY ("ocean_id") REFERENCES "public"."tbl_ocean"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tbl_ocean_trash" ADD CONSTRAINT "tbl_ocean_trash_trash_id_tbl_robot_id_fk" FOREIGN KEY ("trash_id") REFERENCES "public"."tbl_robot"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
