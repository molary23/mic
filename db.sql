-- MySQL dump 10.13  Distrib 8.0.19, for macos10.15 (x86_64)
--
-- Host: 127.0.0.1    Database: mic
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Accounts`
--

DROP TABLE IF EXISTS `Accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Accounts` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `accountnumber` varchar(50) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int unsigned NOT NULL,
  `WalletId` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  KEY `WalletId` (`WalletId`),
  CONSTRAINT `accounts_ibfk_17` FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `accounts_ibfk_18` FOREIGN KEY (`WalletId`) REFERENCES `Wallets` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Accounts`
--

LOCK TABLES `Accounts` WRITE;
/*!40000 ALTER TABLE `Accounts` DISABLE KEYS */;
INSERT INTO `Accounts` VALUES (1,'jvwdksyukfig9w78giukjvbhsvyu','2022-03-18 22:44:53','2022-03-18 22:44:53',1,1);
/*!40000 ALTER TABLE `Accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `accountviews`
--

DROP TABLE IF EXISTS `accountviews`;
/*!50001 DROP VIEW IF EXISTS `accountviews`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `accountviews` AS SELECT 
 1 AS `accountid`,
 1 AS `accountnumber`,
 1 AS `UserId`,
 1 AS `fullname`,
 1 AS `username`,
 1 AS `createdAt`,
 1 AS `updatedAt`,
 1 AS `walletid`,
 1 AS `wallet`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `Announcements`
--

DROP TABLE IF EXISTS `Announcements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Announcements` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `summary` varchar(255) NOT NULL,
  `link` varchar(100) NOT NULL,
  `startdate` date NOT NULL,
  `enddate` date NOT NULL,
  `createdAt` datetime NOT NULL,
  `UserId` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `announcements_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Announcements`
--

LOCK TABLES `Announcements` WRITE;
/*!40000 ALTER TABLE `Announcements` DISABLE KEYS */;
INSERT INTO `Announcements` VALUES (1,'we are having a webinar','we save your money:\nmaking money consistently in the forex market requires years of experience, including losing a lot of money. we save you from loss and trade with our expertise to  make you money from the beginning.\n\nwe do the hard work:\n','https://www.lucipost.com','2022-03-25','2022-03-31','2022-03-25 09:06:17',3);
/*!40000 ALTER TABLE `Announcements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Bonuses`
--

DROP TABLE IF EXISTS `Bonuses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Bonuses` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `UserId` int unsigned NOT NULL,
  `amount` double NOT NULL,
  `status` enum('a','p','r') DEFAULT 'p',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `PaymentId` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  KEY `PaymentId` (`PaymentId`),
  CONSTRAINT `bonuses_ibfk_3` FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `bonuses_ibfk_4` FOREIGN KEY (`PaymentId`) REFERENCES `Payments` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Bonuses`
--

LOCK TABLES `Bonuses` WRITE;
/*!40000 ALTER TABLE `Bonuses` DISABLE KEYS */;
INSERT INTO `Bonuses` VALUES (1,1,10,'p','2022-03-22 04:41:03','2022-03-22 04:41:03',62),(2,1,10,'p','2022-03-22 04:42:27','2022-03-22 04:42:27',65);
/*!40000 ALTER TABLE `Bonuses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `bonusviews`
--

DROP TABLE IF EXISTS `bonusviews`;
/*!50001 DROP VIEW IF EXISTS `bonusviews`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `bonusviews` AS SELECT 
 1 AS `bonusid`,
 1 AS `UserId`,
 1 AS `amount`,
 1 AS `status`,
 1 AS `username`,
 1 AS `payer`,
 1 AS `payerid`,
 1 AS `createdAt`,
 1 AS `updatedAt`,
 1 AS `PaymentId`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `Currencies`
--

DROP TABLE IF EXISTS `Currencies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Currencies` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `firstcurrency` json NOT NULL,
  `secondcurrency` json NOT NULL,
  `status` enum('a','i') DEFAULT 'a',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `currencies_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Currencies`
--

LOCK TABLES `Currencies` WRITE;
/*!40000 ALTER TABLE `Currencies` DISABLE KEYS */;
INSERT INTO `Currencies` VALUES (1,'[\"eu\", \"eur\"]','[\"us\", \"usd\"]','i','2022-03-19 15:36:25','2022-03-25 19:09:10',3),(2,'[\"btc\", \"bitcoin\"]','[\"dge\", \"doge\"]','a','2022-03-19 15:49:45','2022-03-25 19:04:38',3),(3,'[\"au\", \"aud\"]','[\"br\", \"bra\"]','a','2022-03-20 18:21:51','2022-03-20 18:21:51',3),(4,'[\"au\", \"aud\"]','[\"br\", \"bra\"]','a','2022-03-20 18:22:05','2022-03-25 19:05:51',3),(5,'[\"au\", \"aud\"]','[\"us\", \"usd\"]','i','2022-03-20 18:42:31','2022-03-25 19:25:49',3),(6,'[\"br\", \"bra\"]','[\"ca\", \"cad\"]','i','2022-03-25 15:49:48','2022-03-25 19:11:50',3),(7,'[\"cn\", \"chn\"]','[\"us\", \"usd\"]','a','2022-03-25 16:37:36','2022-03-25 16:37:36',3),(8,'[\"btc\", \"bitcoin\"]','[\"us\", \"usd\"]','a','2022-03-25 19:04:15','2022-03-25 19:26:04',3),(9,'[\"dge\", \"doge\"]','[\"br\", \"bra\"]','a','2022-03-25 19:18:31','2022-03-25 19:25:03',3);
/*!40000 ALTER TABLE `Currencies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ForumReplies`
--

DROP TABLE IF EXISTS `ForumReplies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ForumReplies` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `text` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `UserId` int unsigned NOT NULL,
  `ForumId` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  KEY `ForumId` (`ForumId`),
  CONSTRAINT `forumreplies_ibfk_17` FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `forumreplies_ibfk_18` FOREIGN KEY (`ForumId`) REFERENCES `Forums` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ForumReplies`
--

LOCK TABLES `ForumReplies` WRITE;
/*!40000 ALTER TABLE `ForumReplies` DISABLE KEYS */;
INSERT INTO `ForumReplies` VALUES (1,'we are working on it right away.','2022-03-22 12:51:14',3,1),(2,'thanks for your continuous help.','2022-03-22 21:01:22',1,1);
/*!40000 ALTER TABLE `ForumReplies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Forums`
--

DROP TABLE IF EXISTS `Forums`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Forums` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `text` text NOT NULL,
  `status` enum('o','c') DEFAULT 'o',
  `right` enum('u','p') DEFAULT 'u',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `forums_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Forums`
--

LOCK TABLES `Forums` WRITE;
/*!40000 ALTER TABLE `Forums` DISABLE KEYS */;
INSERT INTO `Forums` VALUES (1,'i need help','you will get it.','o','p','2022-03-22 10:49:14','2022-03-22 10:49:14',3),(2,'payment','payment issue.','o','u','2022-03-25 10:23:12','2022-03-25 10:23:12',1);
/*!40000 ALTER TABLE `Forums` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `forumviews`
--

DROP TABLE IF EXISTS `forumviews`;
/*!50001 DROP VIEW IF EXISTS `forumviews`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `forumviews` AS SELECT 
 1 AS `id`,
 1 AS `title`,
 1 AS `text`,
 1 AS `status`,
 1 AS `right`,
 1 AS `replycount`,
 1 AS `UserId`,
 1 AS `creator`,
 1 AS `createdAt`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `Passes`
--

DROP TABLE IF EXISTS `Passes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Passes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `reset` varchar(8) DEFAULT NULL,
  `confirm` enum('n','y') DEFAULT 'n',
  `updatedAt` datetime NOT NULL,
  `UserId` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `passes_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Passes`
--

LOCK TABLES `Passes` WRITE;
/*!40000 ALTER TABLE `Passes` DISABLE KEYS */;
/*!40000 ALTER TABLE `Passes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Payments`
--

DROP TABLE IF EXISTS `Payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Payments` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `amount` double NOT NULL,
  `reference` varchar(255) NOT NULL,
  `status` enum('s','f') DEFAULT 's',
  `gateway` enum('b','c') NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Payments`
--

LOCK TABLES `Payments` WRITE;
/*!40000 ALTER TABLE `Payments` DISABLE KEYS */;
INSERT INTO `Payments` VALUES (1,34,'lbjwvisukjbdiukjb','s','c','2022-03-18 22:44:53','2022-03-18 22:44:53',1),(2,250,'ifsvgf2qh5','f','b','2022-03-21 19:51:29','2022-03-21 19:51:29',1),(3,250,'ifsvgf2qh5','f','b','2022-03-21 19:51:29','2022-03-21 19:51:29',1),(4,250,'pe660jos0e','f','b','2022-03-21 19:53:30','2022-03-21 19:53:30',1),(5,250,'pe660jos0e','f','b','2022-03-21 19:53:30','2022-03-21 19:53:30',1),(6,250,'9edxw4daw4n','f','b','2022-03-21 19:54:27','2022-03-21 19:54:27',1),(7,250,'9edxw4daw4n','f','b','2022-03-21 19:54:27','2022-03-21 19:54:27',1),(8,230,'jhfgeiukgs8iugksdfy','s','b','2022-03-21 20:03:13','2022-03-21 20:03:13',1),(9,230,'jhfgeiukgs8iugksdfy','s','b','2022-03-21 20:03:33','2022-03-21 20:03:33',1),(10,230,'jhfgeiukgs8iugksdfy','s','b','2022-03-21 20:04:03','2022-03-21 20:04:03',1),(11,230,'jhfgeiukgs8iugksdfy','s','b','2022-03-21 20:07:24','2022-03-21 20:07:24',1),(12,230,'jhfgeiukgs8iugksdfy','s','b','2022-03-21 20:07:55','2022-03-21 20:07:55',1),(13,230,'jhfgeiukgs8iugksdfy','s','b','2022-03-21 20:10:35','2022-03-21 20:10:35',1),(14,230,'jhfgeiukgs8iugksdfy','s','b','2022-03-21 20:11:23','2022-03-21 20:11:23',1),(15,230,'jhfgeiukgs8iugksdfy','s','b','2022-03-21 20:12:44','2022-03-21 20:12:44',1),(16,230,'jhfgeiukgs8iugksdfy','s','b','2022-03-21 20:13:38','2022-03-21 20:13:38',1),(17,230,'jhfgeiukgs8iugksdfy','s','b','2022-03-21 20:13:53','2022-03-21 20:13:53',1),(18,230,'jhfgeiukgs8iugksdfy','s','b','2022-03-21 20:14:17','2022-03-21 20:14:17',1),(19,230,'jhfgeiukgs8iugksdfy','s','b','2022-03-21 20:15:05','2022-03-21 20:15:05',1),(20,230,'jhfgeiukgs8iugksdfy','s','b','2022-03-21 20:15:58','2022-03-21 20:15:58',1),(21,230,'jhfgeiukgs8iugksdfy','s','b','2022-03-21 20:16:24','2022-03-21 20:16:24',1),(22,230,'jhfgeiukgs8iugksdfy','s','b','2022-03-21 20:16:43','2022-03-21 20:16:43',1),(23,230,'jhfgeiukgs8iugksdfy','s','b','2022-03-21 20:17:40','2022-03-21 20:17:40',1),(24,230,'jhfgeiukgs8iugksdfy','s','b','2022-03-21 20:20:41','2022-03-21 20:20:41',1),(25,230,'jhfgeiukgs8iugksdfy','s','b','2022-03-21 20:21:03','2022-03-21 20:21:03',1),(26,230,'jhfgeiukgs8iugksdfy','s','b','2022-03-21 20:21:26','2022-03-21 20:21:26',1),(27,230,'jhfgeiukgs8iugksdfy','s','b','2022-03-21 20:21:41','2022-03-21 20:21:41',1),(28,230,'jhfgeiukgs8iugksdfy','s','b','2022-03-21 20:22:54','2022-03-21 20:22:54',1),(29,230,'jhfgeiukgs8iugksdfy','s','b','2022-03-21 20:23:08','2022-03-21 20:23:08',1),(30,230,'jhfgeiukgs8iugksdfy','s','b','2022-03-21 20:23:58','2022-03-21 20:23:58',1),(31,230,'jhfgeiukgs8iugksdfy','s','b','2022-03-21 20:24:24','2022-03-21 20:24:24',1),(32,230,'jhfgeiukgs8iugksdfy','s','b','2022-03-21 20:24:47','2022-03-21 20:24:47',1),(33,230,'jhfgeiukgs8iugksdfy','s','b','2022-03-21 20:24:49','2022-03-21 20:24:49',1),(34,230,'jhfgeiukgs8iugksdfy','s','b','2022-03-21 20:25:11','2022-03-21 20:25:11',1),(35,230,'jhfgeiukgs8iugksdfy','s','b','2022-03-21 20:26:16','2022-03-21 20:26:16',1),(36,230,'jhfgeiukgs8iugksdfy','s','b','2022-03-21 20:26:18','2022-03-21 20:26:18',1),(37,230,'jhfgeiukgs8iugksdfy','s','b','2022-03-21 20:26:36','2022-03-21 20:26:36',1),(38,230,'jhfgeiukgs8iugksdfy','s','b','2022-03-21 20:26:48','2022-03-21 20:26:48',1),(39,230,'jhfgeiukgs8iugksdfy','s','b','2022-03-21 20:31:19','2022-03-21 20:31:19',1),(40,230,'jhfgeiukgs8iugksdfy','s','b','2022-03-21 20:31:39','2022-03-21 20:31:39',1),(41,230,'jhfgeiukgs8iugksdfy','s','b','2022-03-21 20:32:13','2022-03-21 20:32:13',1),(42,230,'jhfgeiukgs8iugksdfy','s','b','2022-03-21 20:32:26','2022-03-21 20:32:26',1),(43,230,'jhfgeiukgs8iugksdfy','s','b','2022-03-21 20:33:13','2022-03-21 20:33:13',1),(44,230,'jhfgeiukgs8iugksdfy','s','b','2022-03-21 20:35:26','2022-03-21 20:35:26',1),(45,230,'jhfgeiukgs8iugksdfy','s','b','2022-03-21 20:36:03','2022-03-21 20:36:03',1),(46,230,'jhfgeiukgs8iugksdfy','s','b','2022-03-21 20:36:44','2022-03-21 20:36:44',1),(47,230,'jhfgeiukgs8iugksdfy','s','b','2022-03-21 20:37:05','2022-03-21 20:37:05',1),(48,230,'jhfgeiukgs8iugksdfy','s','b','2022-03-21 20:37:20','2022-03-21 20:37:20',1),(49,230,'jhfgeiukgs8iugksdfy','s','b','2022-03-21 20:37:53','2022-03-21 20:37:53',1),(50,230,'jhfgeiukgs8iugksdfy','s','b','2022-03-21 20:39:12','2022-03-21 20:39:12',1),(51,230,'jhfgeiukgs8iugksdfy','s','b','2022-03-21 20:40:34','2022-03-21 20:40:34',1),(52,230,'jhfgeiukgs8iugksdfy','s','b','2022-03-21 20:42:37','2022-03-21 20:42:37',1),(53,230,'jhfgeiukgs8iugksdfy','s','b','2022-03-21 20:45:31','2022-03-21 20:45:31',1),(54,230,'jhfgeiukgs8iugksdfy','s','b','2022-03-21 20:46:34','2022-03-21 23:06:11',1),(55,230,'jhfgeiukgs8iugksdfy','f','b','2022-03-21 20:47:02','2022-03-21 23:02:09',1),(56,230,'jhfgeiukgs8iugksdfy','f','b','2022-03-21 20:47:55','2022-03-21 22:53:18',1),(57,50,'vxmfshna6w','s','c','2022-03-21 21:09:15','2022-03-21 23:06:47',1),(58,150,'a8mv09tzbvc','f','c','2022-03-22 04:35:54','2022-03-22 04:35:54',4),(59,150,'u4mqxcl4kw','f','c','2022-03-22 04:37:38','2022-03-22 04:37:38',4),(60,150,'z8ajzycwbgm','f','c','2022-03-22 04:38:33','2022-03-22 04:38:33',4),(61,150,'doy1k7hy6e','f','c','2022-03-22 04:39:05','2022-03-22 04:39:05',4),(62,100,'qxcren1hix','s','c','2022-03-22 04:41:03','2022-03-22 04:41:03',4),(63,100,'k9psma979xj','f','c','2022-03-22 04:41:24','2022-03-22 04:41:24',4),(64,100,'gg5xxhgam6k','f','c','2022-03-22 04:42:20','2022-03-22 04:42:20',4),(65,100,'kkq0607yojc','s','c','2022-03-22 04:42:27','2022-03-22 04:42:27',4);
/*!40000 ALTER TABLE `Payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `paymentviews`
--

DROP TABLE IF EXISTS `paymentviews`;
/*!50001 DROP VIEW IF EXISTS `paymentviews`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `paymentviews` AS SELECT 
 1 AS `payid`,
 1 AS `amount`,
 1 AS `reference`,
 1 AS `status`,
 1 AS `gateway`,
 1 AS `UserId`,
 1 AS `username`,
 1 AS `createdAt`,
 1 AS `updatedAt`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `Preferences`
--

DROP TABLE IF EXISTS `Preferences`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Preferences` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `currencies` json DEFAULT NULL,
  `providers` json DEFAULT NULL,
  `notify` enum('y','n') DEFAULT 'y',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int unsigned NOT NULL,
  `verify` enum('y','n') DEFAULT 'y',
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `preferences_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Preferences`
--

LOCK TABLES `Preferences` WRITE;
/*!40000 ALTER TABLE `Preferences` DISABLE KEYS */;
INSERT INTO `Preferences` VALUES (1,NULL,NULL,'y','2022-03-18 22:44:53','2022-03-22 21:20:03',1,'y'),(4,NULL,'[2]','y','2022-03-19 13:05:02','2022-03-19 13:21:56',4,'y'),(5,NULL,NULL,'y','2022-03-20 18:06:36','2022-03-20 18:07:17',5,'y');
/*!40000 ALTER TABLE `Preferences` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Premia`
--

DROP TABLE IF EXISTS `Premia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Premia` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `status` enum('a','i','n') DEFAULT 'n',
  `enddate` date NOT NULL DEFAULT '2022-03-21',
  `subId` int unsigned DEFAULT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `premia_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Premia`
--

LOCK TABLES `Premia` WRITE;
/*!40000 ALTER TABLE `Premia` DISABLE KEYS */;
INSERT INTO `Premia` VALUES (6,'a','2022-07-23',1,'2022-03-22 04:42:27',4),(7,'a','2022-11-22',53,'2022-03-21 21:09:15',1),(8,'a','2022-03-21',NULL,'2022-03-20 18:07:17',5);
/*!40000 ALTER TABLE `Premia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Profiles`
--

DROP TABLE IF EXISTS `Profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Profiles` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `firstname` varchar(25) DEFAULT NULL,
  `lastname` varchar(25) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int unsigned NOT NULL,
  `phone` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `profiles_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Profiles`
--

LOCK TABLES `Profiles` WRITE;
/*!40000 ALTER TABLE `Profiles` DISABLE KEYS */;
INSERT INTO `Profiles` VALUES (1,NULL,NULL,'//www.gravatar.com/avatar/8b175578004f3b736a4f5495991b01e8?s=200&r=pg&d=mm','2022-03-18 22:44:53','2022-03-18 22:44:53',1,''),(2,NULL,NULL,'//www.gravatar.com/avatar/b83fc5125a19631eb3b79dd38b6666c0?s=200&r=pg&d=mm','2022-03-18 22:45:44','2022-03-18 22:45:44',2,''),(3,NULL,NULL,'//www.gravatar.com/avatar/b2bb8d4f7141ac4f7c1e2cb0835d14cc?s=200&r=pg&d=mm','2022-03-18 22:46:34','2022-03-18 22:46:34',3,''),(4,NULL,NULL,'//www.gravatar.com/avatar/ee442fdf40576735185ebf4debd2f9e9?s=200&r=pg&d=mm','2022-03-19 13:05:02','2022-03-19 13:05:02',4,'2348137530659'),(5,NULL,NULL,'//www.gravatar.com/avatar/eddd7f326fcd9afbb6e22847cb256819?s=200&r=pg&d=mm','2022-03-20 18:06:36','2022-03-20 18:06:36',5,'2348137530659');
/*!40000 ALTER TABLE `Profiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `providerviews`
--

DROP TABLE IF EXISTS `providerviews`;
/*!50001 DROP VIEW IF EXISTS `providerviews`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `providerviews` AS SELECT 
 1 AS `userid`,
 1 AS `username`,
 1 AS `email`,
 1 AS `fullname`,
 1 AS `status`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `Referrals`
--

DROP TABLE IF EXISTS `Referrals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Referrals` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `referral` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `UserId` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `referrals_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Referrals`
--

LOCK TABLES `Referrals` WRITE;
/*!40000 ALTER TABLE `Referrals` DISABLE KEYS */;
INSERT INTO `Referrals` VALUES (1,1,'2022-03-18 22:44:53',1),(2,NULL,'2022-03-18 22:45:44',2),(3,NULL,'2022-03-18 22:46:34',3),(4,1,'2022-03-19 13:05:02',4),(5,1,'2022-03-20 18:06:36',5);
/*!40000 ALTER TABLE `Referrals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `referralviews`
--

DROP TABLE IF EXISTS `referralviews`;
/*!50001 DROP VIEW IF EXISTS `referralviews`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `referralviews` AS SELECT 
 1 AS `id`,
 1 AS `referralId`,
 1 AS `referredId`,
 1 AS `referral`,
 1 AS `referred`,
 1 AS `phone`,
 1 AS `status`,
 1 AS `enddate`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `SequelizeMeta`
--

DROP TABLE IF EXISTS `SequelizeMeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SequelizeMeta`
--

LOCK TABLES `SequelizeMeta` WRITE;
/*!40000 ALTER TABLE `SequelizeMeta` DISABLE KEYS */;
INSERT INTO `SequelizeMeta` VALUES ('bonmigvvv3.js'),('bonmigvvv4.js'),('bonmigvvv5.js'),('forumvimgv222.js'),('migacc.js'),('migratewith2.js'),('migref2.js'),('migref3.js'),('migSigv3.js'),('migUser2.js'),('paymvs.js'),('provim.js'),('subviewmiv4.js'),('superm.js'),('transmigr3.js');
/*!40000 ALTER TABLE `SequelizeMeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Settings`
--

DROP TABLE IF EXISTS `Settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Settings` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `mode` enum('d','n','a','i') DEFAULT 'd',
  `updatedAt` datetime NOT NULL,
  `UserId` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `settings_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Settings`
--

LOCK TABLES `Settings` WRITE;
/*!40000 ALTER TABLE `Settings` DISABLE KEYS */;
INSERT INTO `Settings` VALUES (6,'d','2022-03-19 13:21:56',4),(7,'n','2022-03-25 10:07:30',1),(8,'d','2022-03-20 18:07:17',5),(9,'d','2022-03-20 18:07:17',3),(10,'d','2022-03-20 18:07:17',2);
/*!40000 ALTER TABLE `Settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Signals`
--

DROP TABLE IF EXISTS `Signals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Signals` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `signaloption` enum('b','s') NOT NULL,
  `takeprofit` json DEFAULT NULL,
  `stoploss` json DEFAULT NULL,
  `startrange` double DEFAULT NULL,
  `endrange` double DEFAULT NULL,
  `pip` double DEFAULT NULL,
  `status` enum('f','c','s') DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int unsigned NOT NULL,
  `CurrencyId` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  KEY `CurrencyId` (`CurrencyId`),
  CONSTRAINT `signals_ibfk_15` FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `signals_ibfk_16` FOREIGN KEY (`CurrencyId`) REFERENCES `Currencies` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Signals`
--

LOCK TABLES `Signals` WRITE;
/*!40000 ALTER TABLE `Signals` DISABLE KEYS */;
INSERT INTO `Signals` VALUES (2,'b','[\"0.87\", \"0.72\"]','[\"0.5\", \" 0.07\", \" 0.3\"]',0.094,0.504,-30,'s','2022-03-19 17:04:16','2022-03-19 17:58:33',2,2),(3,'b','[\"0.576\", \"0.985\", \" 0.4653\"]','[\"0.566\", \" 0.074\", \" 0.3425\"]',0.1294,0.50764,67,NULL,'2022-03-19 18:00:39','2022-03-19 18:00:39',2,2),(4,'b','[\"open\"]','[\"0.566\", \" 0.074\"]',0.4094,0.00764,67,NULL,'2022-03-20 17:39:10','2022-03-20 17:39:10',2,1),(5,'b','[\"0.576\", \" 0.985\", \" 0.836\"]','[\"0.566\", \" 0.074\", \" 0.3425\"]',0.0094,2.0746,-7,NULL,'2022-03-20 20:57:11','2022-03-20 20:57:11',2,5);
/*!40000 ALTER TABLE `Signals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `signalviews`
--

DROP TABLE IF EXISTS `signalviews`;
/*!50001 DROP VIEW IF EXISTS `signalviews`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `signalviews` AS SELECT 
 1 AS `signalid`,
 1 AS `signaloption`,
 1 AS `takeprofit`,
 1 AS `stoploss`,
 1 AS `startrange`,
 1 AS `endrange`,
 1 AS `pip`,
 1 AS `status`,
 1 AS `createdAt`,
 1 AS `updatedAt`,
 1 AS `firstcurrency`,
 1 AS `secondcurrency`,
 1 AS `CurrencyId`,
 1 AS `provider`,
 1 AS `providerid`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `Subscriptions`
--

DROP TABLE IF EXISTS `Subscriptions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Subscriptions` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `amount` double NOT NULL,
  `type` enum('b','p') NOT NULL,
  `duration` int NOT NULL,
  `payID` int unsigned DEFAULT NULL,
  `plan` enum('m','y') NOT NULL,
  `package` int unsigned NOT NULL,
  `status` enum('a','p','r') DEFAULT 'a',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `subscriptions_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Subscriptions`
--

LOCK TABLES `Subscriptions` WRITE;
/*!40000 ALTER TABLE `Subscriptions` DISABLE KEYS */;
INSERT INTO `Subscriptions` VALUES (1,20,'p',365,1,'y',1,'a','2022-03-18 22:44:53','2022-03-18 22:44:53',1),(2,230,'p',153,8,'m',5,'a','2022-03-21 20:03:13','2022-03-21 20:03:13',1),(3,230,'p',153,9,'m',5,'a','2022-03-21 20:03:33','2022-03-21 20:03:33',1),(4,230,'p',153,10,'m',5,'a','2022-03-21 20:04:03','2022-03-21 20:04:03',1),(5,230,'p',153,11,'m',5,'a','2022-03-21 20:07:24','2022-03-21 20:07:24',1),(6,230,'p',153,12,'m',5,'a','2022-03-21 20:07:55','2022-03-21 20:07:55',1),(7,230,'p',153,13,'m',5,'a','2022-03-21 20:10:35','2022-03-21 20:10:35',1),(8,230,'p',153,14,'m',5,'a','2022-03-21 20:11:23','2022-03-21 20:11:23',1),(9,230,'p',153,15,'m',5,'a','2022-03-21 20:12:44','2022-03-21 20:12:44',1),(10,230,'p',153,16,'m',5,'a','2022-03-21 20:13:38','2022-03-21 20:13:38',1),(11,230,'p',153,17,'m',5,'a','2022-03-21 20:13:53','2022-03-21 20:13:53',1),(12,230,'p',153,18,'m',5,'a','2022-03-21 20:14:17','2022-03-21 20:14:17',1),(13,230,'p',153,19,'m',5,'a','2022-03-21 20:15:05','2022-03-21 20:15:05',1),(14,230,'p',153,20,'m',5,'a','2022-03-21 20:15:58','2022-03-21 20:15:58',1),(15,230,'p',153,21,'m',5,'a','2022-03-21 20:16:24','2022-03-21 20:16:24',1),(16,230,'p',153,22,'m',5,'a','2022-03-21 20:16:43','2022-03-21 20:16:43',1),(17,230,'p',153,23,'m',5,'a','2022-03-21 20:17:40','2022-03-21 20:17:40',1),(18,230,'p',153,24,'m',5,'a','2022-03-21 20:20:41','2022-03-21 20:20:41',1),(19,230,'p',153,25,'m',5,'a','2022-03-21 20:21:03','2022-03-21 20:21:03',1),(20,230,'p',153,26,'m',5,'a','2022-03-21 20:21:26','2022-03-21 20:21:26',1),(21,230,'p',153,27,'m',5,'a','2022-03-21 20:21:41','2022-03-21 20:21:41',1),(22,230,'p',153,28,'m',5,'a','2022-03-21 20:22:54','2022-03-21 20:22:54',1),(23,230,'p',153,29,'m',5,'a','2022-03-21 20:23:08','2022-03-21 20:23:08',1),(24,230,'p',153,30,'m',5,'a','2022-03-21 20:23:58','2022-03-21 20:23:58',1),(25,230,'p',153,31,'m',5,'a','2022-03-21 20:24:24','2022-03-21 20:24:24',1),(26,230,'p',153,32,'m',5,'a','2022-03-21 20:24:47','2022-03-21 20:24:47',1),(27,230,'p',153,33,'m',5,'a','2022-03-21 20:24:49','2022-03-21 20:24:49',1),(28,230,'p',153,34,'m',5,'a','2022-03-21 20:25:11','2022-03-21 20:25:11',1),(29,230,'p',153,35,'m',5,'a','2022-03-21 20:26:16','2022-03-21 20:26:16',1),(30,230,'p',153,36,'m',5,'a','2022-03-21 20:26:18','2022-03-21 20:26:18',1),(31,230,'p',153,37,'m',5,'a','2022-03-21 20:26:36','2022-03-21 20:26:36',1),(32,230,'p',153,38,'m',5,'a','2022-03-21 20:26:48','2022-03-21 20:26:48',1),(33,230,'p',153,39,'m',5,'a','2022-03-21 20:31:19','2022-03-21 20:31:19',1),(34,230,'p',153,40,'m',5,'a','2022-03-21 20:31:39','2022-03-21 20:31:39',1),(35,230,'p',153,41,'m',5,'a','2022-03-21 20:32:13','2022-03-21 20:32:13',1),(36,230,'p',153,42,'m',5,'a','2022-03-21 20:32:26','2022-03-21 20:32:26',1),(37,230,'p',153,43,'m',5,'a','2022-03-21 20:33:13','2022-03-21 20:33:13',1),(38,230,'p',153,44,'m',5,'a','2022-03-21 20:35:26','2022-03-21 20:35:26',1),(39,230,'p',153,45,'m',5,'a','2022-03-21 20:36:03','2022-03-21 20:36:03',1),(40,230,'p',153,46,'m',5,'a','2022-03-21 20:36:44','2022-03-21 20:36:44',1),(41,230,'p',153,47,'m',5,'a','2022-03-21 20:37:05','2022-03-21 20:37:05',1),(42,230,'p',153,48,'m',5,'a','2022-03-21 20:37:20','2022-03-21 20:37:20',1),(43,230,'p',153,49,'m',5,'a','2022-03-21 20:37:53','2022-03-21 20:37:53',1),(44,230,'p',153,50,'m',5,'a','2022-03-21 20:39:12','2022-03-21 20:39:12',1),(45,230,'p',153,51,'m',5,'a','2022-03-21 20:40:34','2022-03-21 20:40:34',1),(46,230,'p',153,52,'m',5,'a','2022-03-21 20:42:37','2022-03-21 20:42:37',1),(47,230,'p',153,53,'m',5,'a','2022-03-21 20:45:31','2022-03-21 20:45:31',1),(48,230,'p',153,54,'m',5,'a','2022-03-21 20:46:34','2022-03-21 20:46:34',1),(49,230,'p',153,55,'m',5,'a','2022-03-21 20:47:02','2022-03-21 20:47:02',1),(50,230,'p',153,56,'m',5,'a','2022-03-21 20:47:55','2022-03-21 20:47:55',1),(51,20,'b',31,NULL,'m',1,'a','2022-03-21 21:02:05','2022-03-21 21:02:05',1),(52,20,'b',31,NULL,'m',1,'a','2022-03-21 21:02:47','2022-03-21 21:02:47',1),(53,0.1,'b',31,NULL,'m',1,'a','2022-03-21 21:04:43','2022-03-21 21:04:43',1),(54,50,'p',31,57,'m',1,'a','2022-03-21 21:09:15','2022-03-21 21:09:15',1),(55,100,'p',61,62,'m',2,'a','2022-03-22 04:41:03','2022-03-22 04:41:03',4),(56,100,'p',61,65,'m',2,'a','2022-03-22 04:42:27','2022-03-22 04:42:27',4);
/*!40000 ALTER TABLE `Subscriptions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `subscriptionviews`
--

DROP TABLE IF EXISTS `subscriptionviews`;
/*!50001 DROP VIEW IF EXISTS `subscriptionviews`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `subscriptionviews` AS SELECT 
 1 AS `subscriptionid`,
 1 AS `amount`,
 1 AS `type`,
 1 AS `duration`,
 1 AS `package`,
 1 AS `plan`,
 1 AS `status`,
 1 AS `UserId`,
 1 AS `username`,
 1 AS `PayId`,
 1 AS `createdAt`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `superviews`
--

DROP TABLE IF EXISTS `superviews`;
/*!50001 DROP VIEW IF EXISTS `superviews`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `superviews` AS SELECT 
 1 AS `userid`,
 1 AS `username`,
 1 AS `email`,
 1 AS `fullname`,
 1 AS `status`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `Transactions`
--

DROP TABLE IF EXISTS `Transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Transactions` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `amount` double NOT NULL,
  `type` enum('d','c') NOT NULL,
  `method` enum('b','s','w') NOT NULL,
  `createdAt` datetime NOT NULL,
  `UserId` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Transactions`
--

LOCK TABLES `Transactions` WRITE;
/*!40000 ALTER TABLE `Transactions` DISABLE KEYS */;
INSERT INTO `Transactions` VALUES (1,20.5,'c','b','2022-03-18 22:44:53',1),(2,20,'d','s','2022-03-21 21:02:47',1),(3,0.1,'d','s','2022-03-21 21:04:43',1);
/*!40000 ALTER TABLE `Transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `transactionviews`
--

DROP TABLE IF EXISTS `transactionviews`;
/*!50001 DROP VIEW IF EXISTS `transactionviews`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `transactionviews` AS SELECT 
 1 AS `transactionid`,
 1 AS `amount`,
 1 AS `type`,
 1 AS `method`,
 1 AS `fullname`,
 1 AS `username`,
 1 AS `createdAt`,
 1 AS `UserId`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(255) NOT NULL,
  `level` tinyint DEFAULT '1',
  `status` enum('a','i') DEFAULT 'a',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'thelucipost@gmail.com','molary','$2a$10$EN4zWGOIqqvWG8PNMkM71ugXmDwRKNNROT8GARlSrozd5JXGn3ZpS',1,'a','2022-03-18 22:44:53','2022-03-19 15:09:55'),(2,'molary23@gmail.com','molary23','$2a$10$hcCP9IL4HHn7kWIj6NJL7eEGCzAscblYfnX1igXZg/6Eppzee8I8u',2,'a','2022-03-18 22:45:44','2022-03-18 22:45:44'),(3,'mo_lary@yahoo.com','mo_lary','$2a$10$zyedg58rBOPiXm.LyJ3ITuYH4TpBBzACHyK3IKbdMkrZJw6ZY4GXq',3,'a','2022-03-18 22:46:34','2022-03-18 22:46:34'),(4,'mol_ary23@gmail.com','mol','$2a$10$LtShy7/VOSxHMdgGV6D/heU5hnVtBBy.qW336oU982M.0j7Y2Yn/e',1,'a','2022-03-19 13:05:02','2022-03-20 00:40:54'),(5,'molary1@gmail.com','molary1','$2a$10$8EcDLPYF6QhFwr3WlViHVeTCZdZngninEd2ZKYdukM4XPQY41oJWm',1,'a','2022-03-20 18:06:36','2022-03-20 18:07:17'),(6,'molary@yahoo.com','lary','$2a$10$LjsEijIBdLOqeqHsITsrsO03xceyWMN/MgcCTgkvub2fKLGg5gmaa',3,'a','2022-03-25 19:58:49','2022-03-25 19:58:49'),(7,'kasali@kasali.com','kasali','$2a$10$SlQu9mTs8irafNRTnvVxdeWgNjGfQPTXgqawyTEIUcA98EW4yC7TS',3,'a','2022-03-25 19:59:55','2022-03-25 19:59:55');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `userviews`
--

DROP TABLE IF EXISTS `userviews`;
/*!50001 DROP VIEW IF EXISTS `userviews`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `userviews` AS SELECT 
 1 AS `UserId`,
 1 AS `username`,
 1 AS `email`,
 1 AS `fullname`,
 1 AS `userstatus`,
 1 AS `premiumstatus`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `Verifies`
--

DROP TABLE IF EXISTS `Verifies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Verifies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `verify` varchar(8) DEFAULT NULL,
  `confirm` enum('n','y') DEFAULT 'n',
  `updatedAt` datetime NOT NULL,
  `UserId` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `verifies_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Verifies`
--

LOCK TABLES `Verifies` WRITE;
/*!40000 ALTER TABLE `Verifies` DISABLE KEYS */;
INSERT INTO `Verifies` VALUES (1,'o5ef17','y','2022-03-25 09:01:00',1),(2,'q6u2jp','y','2022-03-24 05:35:29',4),(3,NULL,'y','2022-03-20 18:07:17',5);
/*!40000 ALTER TABLE `Verifies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Wallets`
--

DROP TABLE IF EXISTS `Wallets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Wallets` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `wallet` varchar(10) NOT NULL,
  `status` enum('a','i') DEFAULT 'a',
  `createdAt` datetime NOT NULL,
  `UserId` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `wallets_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Wallets`
--

LOCK TABLES `Wallets` WRITE;
/*!40000 ALTER TABLE `Wallets` DISABLE KEYS */;
INSERT INTO `Wallets` VALUES (1,'doge','a','2022-03-18 22:44:53',3);
/*!40000 ALTER TABLE `Wallets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Withdrawals`
--

DROP TABLE IF EXISTS `Withdrawals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Withdrawals` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `amount` float NOT NULL,
  `walletid` int unsigned NOT NULL,
  `accountnumber` varchar(50) NOT NULL,
  `status` enum('p','r','a') DEFAULT 'p',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `withdrawals_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Withdrawals`
--

LOCK TABLES `Withdrawals` WRITE;
/*!40000 ALTER TABLE `Withdrawals` DISABLE KEYS */;
INSERT INTO `Withdrawals` VALUES (1,15,1,',mnvdcuyikjhwbdiukj','a','2022-03-18 22:44:53','2022-03-18 22:44:53',1);
/*!40000 ALTER TABLE `Withdrawals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `withdrawalviews`
--

DROP TABLE IF EXISTS `withdrawalviews`;
/*!50001 DROP VIEW IF EXISTS `withdrawalviews`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `withdrawalviews` AS SELECT 
 1 AS `withdrawalid`,
 1 AS `amount`,
 1 AS `wallet`,
 1 AS `accountnumber`,
 1 AS `Userid`,
 1 AS `fullname`,
 1 AS `username`,
 1 AS `createdAt`,
 1 AS `updatedAt`,
 1 AS `status`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `accountviews`
--

/*!50001 DROP VIEW IF EXISTS `accountviews`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_unicode_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`molary`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `accountviews` AS select `accounts`.`id` AS `accountid`,`accounts`.`accountnumber` AS `accountnumber`,`users`.`id` AS `UserId`,concat(`profiles`.`firstname`,' ',`profiles`.`lastname`) AS `fullname`,`users`.`username` AS `username`,`accounts`.`createdAt` AS `createdAt`,`accounts`.`updatedAt` AS `updatedAt`,`wallets`.`id` AS `walletid`,`wallets`.`wallet` AS `wallet` from (((`accounts` join `users` on((`accounts`.`UserId` = `users`.`id`))) left join `wallets` on((`accounts`.`WalletId` = `wallets`.`id`))) join `profiles` on((`accounts`.`UserId` = `profiles`.`UserId`))) where (`wallets`.`status` = 'a') */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `bonusviews`
--

/*!50001 DROP VIEW IF EXISTS `bonusviews`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_unicode_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`molary`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `bonusviews` AS select `bonuses`.`id` AS `bonusid`,`bonuses`.`UserId` AS `UserId`,`bonuses`.`amount` AS `amount`,`bonuses`.`status` AS `status`,`users`.`username` AS `username`,(select `users`.`username` from (`users` join `payments` on((`users`.`id` = `payments`.`UserId`))) where (`payments`.`id` = `bonuses`.`PaymentId`)) AS `payer`,(select `users`.`id` from (`users` join `payments` on((`users`.`id` = `payments`.`UserId`))) where (`payments`.`id` = `bonuses`.`PaymentId`)) AS `payerid`,`bonuses`.`createdAt` AS `createdAt`,`bonuses`.`updatedAt` AS `updatedAt`,`bonuses`.`PaymentId` AS `PaymentId` from (`bonuses` left join `users` on((`bonuses`.`UserId` = `users`.`id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `forumviews`
--

/*!50001 DROP VIEW IF EXISTS `forumviews`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_unicode_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`molary`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `forumviews` AS select `forums`.`id` AS `id`,`forums`.`title` AS `title`,`forums`.`text` AS `text`,`forums`.`status` AS `status`,`forums`.`right` AS `right`,(select count(0) from `forumreplies` where (`forumreplies`.`ForumId` = `forums`.`id`)) AS `replycount`,`forums`.`UserId` AS `UserId`,(select `users`.`username` from `users` where (`forums`.`UserId` = `users`.`id`)) AS `creator`,`forums`.`createdAt` AS `createdAt` from (`forums` left join `forumreplies` on((`forums`.`id` = `forumreplies`.`ForumId`))) group by `forums`.`id` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `paymentviews`
--

/*!50001 DROP VIEW IF EXISTS `paymentviews`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_unicode_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`molary`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `paymentviews` AS select `payments`.`id` AS `payid`,`payments`.`amount` AS `amount`,`payments`.`reference` AS `reference`,`payments`.`status` AS `status`,`payments`.`gateway` AS `gateway`,`users`.`id` AS `UserId`,`users`.`username` AS `username`,`payments`.`createdAt` AS `createdAt`,`payments`.`createdAt` AS `updatedAt` from (`payments` join `users` on((`payments`.`UserId` = `users`.`id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `providerviews`
--

/*!50001 DROP VIEW IF EXISTS `providerviews`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_unicode_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`molary`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `providerviews` AS select `users`.`id` AS `userid`,`users`.`username` AS `username`,`users`.`email` AS `email`,concat(`profiles`.`firstname`,' ',`profiles`.`lastname`) AS `fullname`,`users`.`status` AS `status` from (`users` left join `profiles` on((`users`.`id` = `profiles`.`UserId`))) where (`users`.`level` = 2) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `referralviews`
--

/*!50001 DROP VIEW IF EXISTS `referralviews`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_unicode_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`molary`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `referralviews` AS select `referrals`.`id` AS `id`,`referrals`.`referral` AS `referralId`,`referrals`.`UserId` AS `referredId`,(select `users`.`username` from `users` where (`users`.`id` = `referrals`.`referral`)) AS `referral`,(select `users`.`username` from `users` where (`users`.`id` = `referrals`.`UserId`)) AS `referred`,(select `profiles`.`phone` from `profiles` where (`profiles`.`UserId` = `referrals`.`UserId`)) AS `phone`,`premia`.`status` AS `status`,`premia`.`enddate` AS `enddate` from (`referrals` left join `premia` on((`premia`.`UserId` = `referrals`.`UserId`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `signalviews`
--

/*!50001 DROP VIEW IF EXISTS `signalviews`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_unicode_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`molary`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `signalviews` AS select `signals`.`id` AS `signalid`,`signals`.`signaloption` AS `signaloption`,`signals`.`takeprofit` AS `takeprofit`,`signals`.`stoploss` AS `stoploss`,`signals`.`startrange` AS `startrange`,`signals`.`endrange` AS `endrange`,`signals`.`pip` AS `pip`,`signals`.`status` AS `status`,`signals`.`createdAt` AS `createdAt`,`signals`.`updatedAt` AS `updatedAt`,`currencies`.`firstcurrency` AS `firstcurrency`,`currencies`.`secondcurrency` AS `secondcurrency`,`signals`.`CurrencyId` AS `CurrencyId`,`users`.`username` AS `provider`,`users`.`id` AS `providerid` from ((`signals` join `users` on((`users`.`id` = `signals`.`UserId`))) join `currencies` on((`signals`.`CurrencyId` = `currencies`.`id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `subscriptionviews`
--

/*!50001 DROP VIEW IF EXISTS `subscriptionviews`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_unicode_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`molary`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `subscriptionviews` AS select `subscriptions`.`id` AS `subscriptionid`,`subscriptions`.`amount` AS `amount`,`subscriptions`.`type` AS `type`,`subscriptions`.`duration` AS `duration`,`subscriptions`.`package` AS `package`,`subscriptions`.`plan` AS `plan`,`subscriptions`.`status` AS `status`,`subscriptions`.`UserId` AS `UserId`,`users`.`username` AS `username`,`subscriptions`.`payID` AS `PayId`,`subscriptions`.`createdAt` AS `createdAt` from (`subscriptions` left join `users` on((`subscriptions`.`UserId` = `users`.`id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `superviews`
--

/*!50001 DROP VIEW IF EXISTS `superviews`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_unicode_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`molary`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `superviews` AS select `users`.`id` AS `userid`,`users`.`username` AS `username`,`users`.`email` AS `email`,concat(`profiles`.`firstname`,' ',`profiles`.`lastname`) AS `fullname`,`users`.`status` AS `status` from (`users` left join `profiles` on((`users`.`id` = `profiles`.`UserId`))) where (`users`.`level` = 3) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `transactionviews`
--

/*!50001 DROP VIEW IF EXISTS `transactionviews`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_unicode_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`molary`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `transactionviews` AS select `transactions`.`id` AS `transactionid`,`transactions`.`amount` AS `amount`,`transactions`.`type` AS `type`,`transactions`.`method` AS `method`,concat(`profiles`.`firstname`,' ',`profiles`.`lastname`) AS `fullname`,`users`.`username` AS `username`,`transactions`.`createdAt` AS `createdAt`,`profiles`.`UserId` AS `UserId` from ((`transactions` left join `profiles` on((`transactions`.`UserId` = `profiles`.`UserId`))) left join `users` on((`transactions`.`UserId` = `users`.`id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `userviews`
--

/*!50001 DROP VIEW IF EXISTS `userviews`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_unicode_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`molary`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `userviews` AS select `users`.`id` AS `UserId`,`users`.`username` AS `username`,`users`.`email` AS `email`,concat(`profiles`.`firstname`,' ',`profiles`.`lastname`) AS `fullname`,`users`.`status` AS `userstatus`,`premia`.`status` AS `premiumstatus` from ((`users` left join `profiles` on((`users`.`id` = `profiles`.`UserId`))) left join `premia` on((`users`.`id` = `premia`.`UserId`))) where (`users`.`level` = 1) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `withdrawalviews`
--

/*!50001 DROP VIEW IF EXISTS `withdrawalviews`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_unicode_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`molary`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `withdrawalviews` AS select `withdrawals`.`id` AS `withdrawalid`,`withdrawals`.`amount` AS `amount`,(select `wallets`.`wallet` from `wallets` where (`wallets`.`id` = `withdrawals`.`walletid`)) AS `wallet`,`withdrawals`.`accountnumber` AS `accountnumber`,`users`.`id` AS `Userid`,concat(`profiles`.`firstname`,' ',`profiles`.`lastname`) AS `fullname`,`users`.`username` AS `username`,`withdrawals`.`createdAt` AS `createdAt`,`withdrawals`.`updatedAt` AS `updatedAt`,`withdrawals`.`status` AS `status` from ((`withdrawals` join `users` on((`withdrawals`.`UserId` = `users`.`id`))) join `profiles` on((`withdrawals`.`UserId` = `profiles`.`UserId`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-03-25 21:21:48
