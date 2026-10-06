CREATE TABLE `books` (
	`id` text PRIMARY KEY NOT NULL,
	`owner_id` text NOT NULL,
	`title` text NOT NULL,
	`author` text NOT NULL,
	`status` text DEFAULT 'want_to_read' NOT NULL,
	`rating` integer,
	`notes` text,
	`finished_at` integer,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL
);
