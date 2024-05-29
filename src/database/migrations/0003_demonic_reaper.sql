CREATE TABLE IF NOT EXISTS "tbl_temperature_robot" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"robot_id" uuid NOT NULL,
	"ocean_id" uuid NOT NULL,
	"temperature_celsius" integer NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tbl_temperature_robot" ADD CONSTRAINT "tbl_temperature_robot_robot_id_tbl_robot_id_fk" FOREIGN KEY ("robot_id") REFERENCES "public"."tbl_robot"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tbl_temperature_robot" ADD CONSTRAINT "tbl_temperature_robot_ocean_id_tbl_ocean_id_fk" FOREIGN KEY ("ocean_id") REFERENCES "public"."tbl_ocean"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
