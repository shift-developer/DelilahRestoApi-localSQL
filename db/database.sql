SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE DATABASE IF NOT EXISTS `delilah_resto_localdb` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `delilah_resto_localdb`;

DROP TABLE IF EXISTS `Users`;
CREATE TABLE `Users` (
	`id_user` INT(11) NOT NULL AUTO_INCREMENT,
	`full_name` VARCHAR(50) NOT NULL,
	`email` VARCHAR(70) NOT NULL,
	`telephone` VARCHAR(50) NOT NULL,
	`username` VARCHAR(50) NOT NULL,
	`password` VARCHAR(150) NOT NULL,
	`address` VARCHAR(150) NOT NULL,
	`admin` INT(1) NULL DEFAULT 0,
	PRIMARY KEY (`id_user`),
	UNIQUE (`email`),
	UNIQUE (`username`)
);

INSERT INTO `Users` (`full_name`, `email`, `telephone`, `username`, `password`, `address`, `admin`) VALUES
("Admin", "admin@delilah.com", "3516664564", "admin", "$2a$10$BYF4QeI9DWpcyYD3YtKU7Ou9DSjlthGuX3YhuSwQM.Ax0PvqE17qa", "Admin", 1);

INSERT INTO `Users` (`full_name`, `email`, `telephone`, `username`, `password`, `address`) VALUES 
("Juan Cruz Gonzalez", "juancruzgon@gmail.com", "3516458574", "juanshift", "$2a$10$NKlv0Z3sPFukYdFe/SgUvOm3wQwH0PlOVfJOEr.6h0CxvgnUpSEre", "Croacia 2345"),
("Jhon F Kenedy", "kenedy@gmail.com", "1552365677", "kenedy", "$2a$10$HN.13IrkWU5KjMup6yhhPOCeLVLSuc3q.jxg1zxISaMhAHTbS2t5G", "North Stratford 21"),
("Michael Jackson", "kingofpop@gmail.com", "15656232455", "ayuwoki_michael", "$2a$10$oyRI9K4er/2PDj.eQtnFEeMoMTqK67c41FziqJIXFf.uuYs8YAlb6", "Neverland Ranch 123"),
("Freddie Mercury", "heehee@gmail.com", "2565565645", "heehee_freddie", "$2a$10$dlT/def.NrHdrP5h1CbVluh4aVBgTrl08Qjdvws.uDs1ugCP5WHB6", "Bohemian Rhapsody 45"),
("Ricardo Fort", "elcomandante@gmail.com", "1165568845", "el_comandante", "$2a$10$SVeVumP.F3B.b7EQX.Sc3.UX1HHUT96urd8ACorAvMx4ETcqXU2Hm", "Cutucuchillo 4526"),
("Thomas Anderson", "thechosenone@gmail.com", "1176584665", "neo_matrix", "$2a$10$9U9Uk9Y7S1YrdwXGGh5SUuafuW3ze2WIJSRedqHGbMVYAndDRNG32", "Matrix 1"),
("Robert Downey Jr", "ironman@gmail.com", "1174545465", "iron_man", "$2a$10$42fhwFEJimknhiHX.HbvtOZHPBC2JKkO6aZCxuwrorlbG2wNp5sOe", "Avengers HQ 84"),
("Elon Musk", "realironman@gmail.com", "1178896845", "elon_musk", "$2a$10$sULuYUhfrK5Zqg5jxo1lNuVVuEA/ZzxEhE5/PUO1VlIRG9x.EOHzW", "Tesla 1232"),
("Dafne Suarez", "dafilinda@gmail.com", "3516894523", "dafitop", "$2a$10$.4nLhd7JU6pTI1qLWDniee7FGbOZxgdFJS3UlJVdJIj115R5eLTBG", "Glam 77"),
("Ramiro Golmar", "rami@gmail.com", "3516547889", "ramikratos", "$2a$10$5nVmdydh5pJ7.FY3cx.fKe0Fsi..ioh4PcfWjMNFiuYfLCKSIzOO.", "Maza 338");


DROP TABLE IF EXISTS `Products`;
CREATE TABLE `Products` (
	`id_product` INT(11) NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(80) NOT NULL,
	`price` VARCHAR(30) NOT NULL,
	`url_image` VARCHAR(250) NOT NULL,
	`code` VARCHAR(30) NOT NULL,
	`description` VARCHAR(300) NOT NULL,
	PRIMARY KEY (`id_product`)
);

INSERT INTO `Products` (`name`, `price`, `url_image`, `code`, `description`) VALUES 
("Salmon Bagel", "480", "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fcdn-image.myrecipes.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Fmedium_2x%2Fpublic%2Fsmoked-salmon-bagel-su.jpg%3Fitok%3DtZG4DuRu", "SalBag", "Starting with smoked salmon, this bagel sandwich is layered with tasty ingredients—flavored cream cheese, capers, and purple onion. It's a quick fix for a brown-bag lunch."),
("Caramelized Onion Hamburguer", "400", "https://i.pinimg.com/564x/62/90/66/62906630532382d3da99e5f118a1b6c9.jpg", "CarHam", "Grilled hamburger with caramelized onion, mushrooms, ceddar cheese, lettuce and tomato with pepper mayonnaise sauce."),
("Goliath Hamburguer", "500", "https://i.pinimg.com/236x/03/3a/22/033a22b25db4d88105b5e4ab59baf810.jpg", "GolHam", "Big hamburguer with double cheese and double quarter pound meat"),
("Pepperoni Pizza", "600", "https://i.pinimg.com/564x/57/48/f6/5748f66613de9ac009fd9337e99b6e6b.jpg", "PepPiz", "A great crust, gooey cheese, and tons of pepperoni. The secret to great pepperoni flavor? Hide extra under the cheese!"),
("Marinated Vegetable Sandwich", "300", "https://i.pinimg.com/236x/8d/c6/85/8dc6859990959a28cb10208077785f8e.jpg", "VegSand", "Grilled summer vegetables marinated in fresh herbs and spices, two kinds of cheese, homemade sun-dried tomato pesto, all sandwiched between crusty grilled ciabatta."),
("Caesar Salad", "500", "https://i.pinimg.com/564x/cb/99/75/cb9975d8c68b0b291c328a5d80af17af.jpg", "CesSal", "Classic Caesar Salad "),
("Classic Hamburguer", "320","https://i.pinimg.com/236x/08/eb/e2/08ebe20cb7072f53d432cd49aeb80b45.jpg", "ClaHam", "Classic cheese burguer"),
("Monster Fries", "400","https://i.pinimg.com/564x/46/1d/0c/461d0c8e159da965b794e57cb795e547.jpg", "MonFri", "Potato french fries with bacon");

DROP TABLE IF EXISTS `Orders`;
CREATE TABLE `Orders` (
	`id_order` INT(11) NOT NULL AUTO_INCREMENT,
	`id_user` INT(11) NOT NULL,
	`total_price` VARCHAR(50) NOT NULL,
	`id_payment` INT(2) NOT NULL,
	`date` DATETIME NOT NULL,
	`description` VARCHAR(300) NOT NULL,
	`address` VARCHAR(150) NOT NULL,
	`id_status` INT(2) NOT NULL,
	PRIMARY KEY (`id_order`)
);

INSERT INTO `Orders` (`id_user`, `total_price`, `id_payment`, `date`, `description`, `address`, `id_status`) VALUES
(2, "1400", 1, "2020/08/14 14:02:42", "1xCarHam 1xPepPiz 1xMonFri", "Croacia 2345", 5),
(3, "1000", 2, "2020/08/14 14:05:03", "2xGolHam", "North Stratford 21", 4),
(4, "800", 2, "2020/08/14 14:06:25", "1xCesSal 1xVegSand", "Neverland Ranch 123", 4),
(5, "8400", 1, "2020/08/14 14:09:33", "10xPepPiz 5xSalBag", "Bohemian Rhapsody 45", 3),
(6, "960", 3, "2020/08/14 14:18:48", "3xClaHam", "Cutucuchillo 4526", 3),
(7, "720", 2, "2020/08/14 14:21:15", "1xMonFri 1xClaHam", "Matrix 1", 6),
(8, "900", 1, "2020/08/14 14:25:02", "1xCarHam 1xVegSand", "Avengers HQ 84", 2),
(9, "800", 2, "2020/08/14 14:29:54", "2xMonFri", "Tesla 1232", 2),
(10, "2000", 2, "2020/08/14 14:31:49", "4xGolHam", "Glam 77", 1);

DROP TABLE IF EXISTS `StatusCode`;
CREATE TABLE `StatusCode` (
	`id_status` INT(11) NOT NULL AUTO_INCREMENT,
	`status` VARCHAR(50) NOT NULL,
	`description` VARCHAR(300) NOT NULL,
	PRIMARY KEY (`id_status`)
);

INSERT INTO `StatusCode` (`status`, `description`) VALUES 
("new", "The order was posted correctly"),
("confirmed", "The order was approved successfully"),
("cooking", "The chef is preparing the order"),
("sending", "The order is on the way"), 
("delivered", "The order was successfully delivered"),
("canceled", "Canceled order");

DROP TABLE IF EXISTS `Payment`;
CREATE TABLE `Payment` (
	`id_payment` INT(11) NOT NULL AUTO_INCREMENT,
	`payment_method` VARCHAR(30) NOT NULL,
	PRIMARY KEY (`id_payment`)
);

INSERT INTO `Payment` (`payment_method`) VALUES 
("cash"),
("creditcard"),
("debit");

DROP TABLE IF EXISTS `Products_Orders`;
CREATE TABLE `Products_Orders` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`id_order` INT(11) NOT NULL,
	`id_product` INT(11) NOT NULL,
	`quantity` INT(3) NOT NULL,
	PRIMARY KEY (`id`)
);

INSERT INTO `Products_Orders` (`id_order`, `id_product`, `quantity`) VALUES 
(1, 2, 1),
(1, 4, 1),
(1, 8, 1),
(2, 3, 2),
(3, 5, 1),
(3, 6, 1),
(4, 1, 5),
(4, 4, 10),
(5, 7, 3),
(6, 8, 1),
(6, 7, 1),
(7, 2, 1),
(7, 2, 1),
(8, 8, 2),
(9, 3, 4);

DROP TABLE IF EXISTS `Products_Favorites`;
CREATE TABLE `Products_Favorites` (
	`id_favorite` INT(11) NOT NULL AUTO_INCREMENT,
	`id_user` INT(11) NOT NULL,
	`id_product` INT(11) NOT NULL,
	PRIMARY KEY (`id_favorite`)
);

INSERT INTO `Products_Favorites` (`id_user`, `id_product`) VALUES 
(2, 2),
(2, 4),
(3, 4),
(4, 1),
(4, 8),
(5, 4),
(5, 3),
(6, 5);

ALTER TABLE `Orders`
	ADD KEY `id_user` (`id_user`),
	ADD KEY `id_payment` (`id_payment`),
	ADD KEY `id_status` (`id_status`);

ALTER TABLE `Products_Orders`
	ADD KEY `id_order` (`id_order`),
	ADD KEY `id_product` (`id_product`);

ALTER TABLE `Products_Favorites`
	ADD KEY `id_user` (`id_user`),
	ADD KEY `id_product` (`id_product`);

ALTER TABLE `Orders`
	ADD CONSTRAINT `Orders_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `Users` (`id_user`) ON DELETE CASCADE,
	ADD CONSTRAINT `Orders_ibfk_2` FOREIGN KEY (`id_payment`) REFERENCES `Payment` (`id_payment`),
	ADD CONSTRAINT `Orders_ibfk_3` FOREIGN KEY (`id_status`) REFERENCES `StatusCode` (`id_status`);

ALTER TABLE `Products_Orders`
	ADD CONSTRAINT `Products_Orders_ibfk_1` FOREIGN KEY (`id_order`) REFERENCES `Orders` (`id_order`) ON DELETE CASCADE,
	ADD CONSTRAINT `Products_Orders_ibfk_2` FOREIGN KEY (`id_product`) REFERENCES `Products` (`id_product`) ON DELETE CASCADE;

ALTER TABLE `Products_Favorites`
	ADD CONSTRAINT `Products_Favorites_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `Users` (`id_user`) ON DELETE CASCADE,
	ADD CONSTRAINT `Products_Favorites_ibfk_2` FOREIGN KEY (`id_product`) REFERENCES `Products` (`id_product`) ON DELETE CASCADE;
COMMIT;

