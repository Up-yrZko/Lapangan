-- Fix duplicate UNIQUE keys di users table
ALTER TABLE `users` DROP KEY `username_2`;
ALTER TABLE `users` DROP KEY `email_2`;

-- Ensure bookings table has CASCADE delete
ALTER TABLE `bookings` DROP FOREIGN KEY `bookings_ibfk_3`;
ALTER TABLE `bookings` DROP FOREIGN KEY `bookings_ibfk_4`;

ALTER TABLE `bookings` 
  ADD CONSTRAINT `bookings_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `bookings_ibfk_4` FOREIGN KEY (`field_id`) REFERENCES `fields` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- Add photo column ke fields if not exists
ALTER TABLE `fields` ADD COLUMN `photo` VARCHAR(255) DEFAULT NULL;

-- Verify structure
SHOW CREATE TABLE `users`;
SHOW CREATE TABLE `fields`;
SHOW CREATE TABLE `bookings`;
