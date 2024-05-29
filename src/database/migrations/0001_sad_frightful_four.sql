CREATE TABLE IF NOT EXISTS "tbl_trash" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"latitude" double precision NOT NULL,
	"longitude" double precision NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"robot_id" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "tbl_robot" DROP CONSTRAINT "tbl_robot_robot_id_tbl_robot_id_fk";
--> statement-breakpoint
ALTER TABLE "tbl_ocean_trash" DROP CONSTRAINT "tbl_ocean_trash_trash_id_tbl_robot_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tbl_trash" ADD CONSTRAINT "tbl_trash_robot_id_tbl_robot_id_fk" FOREIGN KEY ("robot_id") REFERENCES "public"."tbl_robot"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tbl_ocean_trash" ADD CONSTRAINT "tbl_ocean_trash_trash_id_tbl_trash_id_fk" FOREIGN KEY ("trash_id") REFERENCES "public"."tbl_trash"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "tbl_robot" DROP COLUMN IF EXISTS "robot_id";