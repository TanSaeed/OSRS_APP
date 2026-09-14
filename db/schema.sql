-- Portable MySQL schema used by Docker on the first creation of its data volume.
-- The clans/users relationship is circular, so the leader foreign key is added
-- after both tables exist.

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `loadout`;
DROP TABLE IF EXISTS `loot`;
DROP TABLE IF EXISTS `users`;
DROP TABLE IF EXISTS `clans`;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE `clans` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `clan_name` VARCHAR(20) DEFAULT NULL,
  `leader_id` INT UNSIGNED DEFAULT NULL,
  `est_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_clans_leader_id` (`leader_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `users` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(12) NOT NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `user_role` ENUM('member', 'leader', 'admin') NOT NULL DEFAULT 'member',
  `clan_id` INT UNSIGNED DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_users_username` (`username`),
  KEY `idx_users_clan_id` (`clan_id`),
  CONSTRAINT `fk_users_clan`
    FOREIGN KEY (`clan_id`) REFERENCES `clans` (`id`)
    ON UPDATE CASCADE ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

ALTER TABLE `clans`
  ADD CONSTRAINT `fk_clans_leader`
  FOREIGN KEY (`leader_id`) REFERENCES `users` (`id`)
  ON UPDATE CASCADE ON DELETE SET NULL;

CREATE TABLE `loadout` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` INT UNSIGNED DEFAULT NULL,
  `equipment` JSON DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_loadout_user_id` (`user_id`),
  CONSTRAINT `fk_loadout_user`
    FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
    ON UPDATE CASCADE ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `loot` (
  `loot_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `quantity` INT UNSIGNED NOT NULL,
  `added_by` INT UNSIGNED DEFAULT NULL,
  `clan_id` INT UNSIGNED DEFAULT NULL,
  PRIMARY KEY (`loot_id`),
  KEY `idx_loot_added_by` (`added_by`),
  KEY `idx_loot_clan_id` (`clan_id`),
  CONSTRAINT `fk_loot_added_by`
    FOREIGN KEY (`added_by`) REFERENCES `users` (`id`)
    ON UPDATE CASCADE ON DELETE SET NULL,
  CONSTRAINT `fk_loot_clan`
    FOREIGN KEY (`clan_id`) REFERENCES `clans` (`id`)
    ON UPDATE CASCADE ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
