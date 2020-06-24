DROP DATABASE  IF EXISTS `peoplegram`;

CREATE SCHEMA `peoplegram`;
USE `peoplegram`;

CREATE TABLE `user` (
  `UserID` int NOT NULL AUTO_INCREMENT,
  `Gebruikersnaam` varchar(45) NOT NULL,
  `Password` varchar(200) NOT NULL,
  `Voornaam` varchar(45) NOT NULL,
  `Email` varchar(45) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`UserID`),
  UNIQUE KEY `Email_UNIQUE` (`Email`),
  UNIQUE KEY `Gebruikersnaam_UNIQUE` (`Gebruikersnaam`),
  UNIQUE KEY `Voornaam_UNIQUE` (`Voornaam`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `post` (
  `PostID` int NOT NULL AUTO_INCREMENT,
  `Title` varchar(45) NOT NULL,
  `Status` varchar(45) NOT NULL,
  `Prijs` varchar(45) NOT NULL,
  `Beschrijving` varchar(225) NOT NULL,
  `cover_photo_url` varchar(15550) DEFAULT NULL,
  `created_by` bigint DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`PostID`),
  KEY `fk_useridx_idx` (`created_by`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(60) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_roles_name` (`name`),
  UNIQUE KEY `UK_nb4h0p6txrmfc0xbrd1kglp9t` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

INSERT INTO `peoplegram`.`roles` (`id`, `name`) VALUES ('5', 'ROLE_ADMIN');
INSERT INTO `peoplegram`.`roles` (`id`, `name`) VALUES ('4', 'ROLE_USER');


CREATE TABLE `user_roles` (
  `user_id` int NOT NULL,
  `role_id` int NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `fk_user_roles_role_id` (`role_id`),
  CONSTRAINT `fk_user_roles_role_id` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`),
  CONSTRAINT `fk_user_roles_user_idx` FOREIGN KEY (`user_id`) REFERENCES `user` (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;




