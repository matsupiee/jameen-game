CREATE TABLE `celebrities` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`profile` text,
	`category` text NOT NULL,
	`scandal_summary` text,
	`source_url` text,
	`image_url` text
);
--> statement-breakpoint
CREATE TABLE `quiz_celebrities` (
	`quiz_id` integer NOT NULL,
	`celebrity_id` integer NOT NULL,
	`position` integer NOT NULL,
	PRIMARY KEY(`quiz_id`, `celebrity_id`),
	FOREIGN KEY (`quiz_id`) REFERENCES `quizzes`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`celebrity_id`) REFERENCES `celebrities`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `quizzes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `scores` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`quiz_id` integer NOT NULL,
	`player_name` text NOT NULL,
	`score` integer NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`quiz_id`) REFERENCES `quizzes`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `scores_quiz_score_idx` ON `scores` (`quiz_id`,`score`);