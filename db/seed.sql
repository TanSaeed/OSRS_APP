-- Small, non-production dataset for local database mode.
-- All three users use the password: demo1234

INSERT INTO `clans` (`id`, `clan_name`, `leader_id`, `est_at`) VALUES
  (1, 'Lumbridge Legends', NULL, '2024-01-15 10:00:00'),
  (2, 'Varrock Vanguard', NULL, '2023-11-02 18:30:00');

INSERT INTO `users` (`id`, `username`, `password_hash`, `user_role`, `clan_id`, `created_at`) VALUES
  (101, 'demo_leader', 'scrypt:osrs-local-demo:_rbTcljGCLyU_Rxr1d0geulq5XRfwhwn9ubdLgG04wKF1ExPUKZvB4dps8LiPsHTn02uIKTeLzYyRyf8OpgX5A', 'leader', 1, '2024-01-15 10:00:00'),
  (102, 'demo_member1', 'scrypt:osrs-local-demo:_rbTcljGCLyU_Rxr1d0geulq5XRfwhwn9ubdLgG04wKF1ExPUKZvB4dps8LiPsHTn02uIKTeLzYyRyf8OpgX5A', 'member', 1, '2024-02-02 12:30:00'),
  (201, 'demo_vanguard', 'scrypt:osrs-local-demo:_rbTcljGCLyU_Rxr1d0geulq5XRfwhwn9ubdLgG04wKF1ExPUKZvB4dps8LiPsHTn02uIKTeLzYyRyf8OpgX5A', 'leader', 2, '2023-11-02 18:30:00');

UPDATE `clans` SET `leader_id` = 101 WHERE `id` = 1;
UPDATE `clans` SET `leader_id` = 201 WHERE `id` = 2;

INSERT INTO `loadout` (`id`, `user_id`, `equipment`) VALUES
  (1, 101, JSON_OBJECT('head', 'Armadyl helmet', 'body', 'Armadyl chestplate', 'weapon', 'Twisted bow')),
  (2, 201, JSON_OBJECT('head', 'Ancestral hat', 'body', 'Ancestral robe top', 'weapon', 'Kodai wand'));

INSERT INTO `loot` (`loot_id`, `quantity`, `added_by`, `clan_id`) VALUES
  (11802, 1, 101, 1),
  (20997, 1, 102, 1),
  (22486, 3, 201, 2);
