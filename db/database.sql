SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE DATABASE IF NOT EXISTS `delilah_resto_localdb` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `delilah_resto_localdb`;

DROP TABLE IF EXISTS `Users`;
CREATE TABLE `Users` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`full_name` VARCHAR(50) NOT NULL,
	`email` VARCHAR(70) NOT NULL,
	`telephone` VARCHAR(50) NOT NULL,
	`username` VARCHAR(50) NOT NULL,
	`password` VARCHAR(150) NOT NULL,
	`address` VARCHAR(150) NOT NULL,
	`admin` INT(1) NULL DEFAULT 0,
	PRIMARY KEY (`id`)
);

INSERT INTO `Users` (`full_name`, `email`, `telephone`, `username`, `password`, `address`, `admin`) VALUES
("Admin", "admin@delilah.com", "3516664564", "admin", "adminpass", "Admin", 1);

INSERT INTO `Users` (`full_name`, `email`, `telephone`, `username`, `password`, `address`) VALUES 
("Juan Cruz Gonzalez", "juancruzgon@gmail.com", "3516458574", "juanshift", "mas12563", "croacio2345"),
("Jhon F Kenedy", "kenedy@gmail.com", "1552365677", "kenedy", "sniper965", "North Stratford 21"),
("Michael Jackson", "kingofpop@gmail.com", "15656232455", "ayuwoki_michael", "moonwalk185", "Neverland Ranch 123"),
("Freddie Mercury", "heehee@gmail.com", "2565565645", "heehee_freddie", "heehee12", "Bohemian Rhapsody 45"),
("Ricardo Fort", "elcomandante@gmail.com", "1165568845", "el_comandante", "rollsroyce99", "Cutucuchillo 4526"),
("Thomas Anderson", "thechosenone@gmail.com", "1178894565", "neo_matrix", "wakeup000", "Matrix 1");

DROP TABLE IF EXISTS `Products`;
CREATE TABLE `Products` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(80) NOT NULL,
	`price` VARCHAR(30) NOT NULL,
	`url_image` VARCHAR(250) NOT NULL,
	`code` VARCHAR(30) NOT NULL,
	`description` VARCHAR(300) NOT NULL,
	PRIMARY KEY (`id`)
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
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`id_user` INT(11) NOT NULL,
	`total_price` VARCHAR(50) NOT NULL,
	`id_payment` INT(2) NOT NULL,
	`date` DATETIME NOT NULL,
	`description` VARCHAR(300) NOT NULL,
	`address` VARCHAR(150) NOT NULL,
	`id_status` INT(2) NOT NULL,
	PRIMARY KEY (`id`)
);

INSERT INTO `Orders` (`id_user`, `total_price`, `id_payment`, `date`, `description`, `address`, `id_status`) VALUES
(3, "1000", 1, "2020/08/14 14:15:03", "2xGolHam", "North Stratford 21", "1");

DROP TABLE IF EXISTS `Status`;
CREATE TABLE `Status` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`status` VARCHAR(50) NOT NULL,
	`description` VARCHAR(300) NOT NULL,
	PRIMARY KEY (`id`)
);

INSERT INTO `Status` (`status`, `description`) VALUES 
("new", "The order was posted correctly"),
("confirmed", "The order was approved successfully"),
("cooking", "The chef is preparing the order"),
("sending", "The order is on the way"), 
("delivered", "The order was successfully delivered"),
("canceled", "Canceled order");

DROP TABLE IF EXISTS `Payment`;
CREATE TABLE `Payment` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`payment_method` VARCHAR(30) NOT NULL,
	PRIMARY KEY (`id`)
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
(1, 3, 2);

DROP TABLE IF EXISTS `Products_Favorites`;
CREATE TABLE `Products_Favorites` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`id_user` INT(11) NOT NULL,
	`id_product` INT(11) NOT NULL,
	PRIMARY KEY (`id`)
);

INSERT INTO `Products_Favorites` (`id_user`, `id_product`) VALUES 
(1, 3),
(1, 2),
(2, 4),
(2, 1),
(2, 3),
(4, 5);
