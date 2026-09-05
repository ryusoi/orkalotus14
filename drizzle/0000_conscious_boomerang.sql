CREATE TABLE `guestAssets` (
	`id` int AUTO_INCREMENT NOT NULL,
	`createdByUserId` int NOT NULL,
	`fileName` varchar(255) NOT NULL,
	`storageKey` varchar(512) NOT NULL,
	`url` varchar(768) NOT NULL,
	`contentType` varchar(128) NOT NULL,
	`sizeBytes` int NOT NULL,
	`label` varchar(160),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `guestAssets_id` PRIMARY KEY(`id`),
	CONSTRAINT `guestAssets_storageKey_unique` UNIQUE(`storageKey`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`openId` varchar(64) NOT NULL,
	`name` text,
	`email` varchar(320),
	`loginMethod` varchar(64),
	`role` enum('user','admin') NOT NULL DEFAULT 'user',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`lastSignedIn` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_openId_unique` UNIQUE(`openId`)
);
