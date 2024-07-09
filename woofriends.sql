/*!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19  Distrib 10.5.25-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: woofriends
-- ------------------------------------------------------
-- Server version	10.5.25-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `colors`
--

DROP TABLE IF EXISTS `colors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `colors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `color` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `colors`
--

LOCK TABLES `colors` WRITE;
/*!40000 ALTER TABLE `colors` DISABLE KEYS */;
INSERT INTO `colors` VALUES (1,'Blanco'),(2,'Negro'),(3,'Café'),(4,'Rubio');
/*!40000 ALTER TABLE `colors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dog_colors`
--

DROP TABLE IF EXISTS `dog_colors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dog_colors` (
  `dog_id` int(11) NOT NULL,
  `color_id` int(11) NOT NULL,
  PRIMARY KEY (`dog_id`,`color_id`),
  KEY `color_id` (`color_id`),
  CONSTRAINT `dog_colors_ibfk_1` FOREIGN KEY (`dog_id`) REFERENCES `dogs` (`id`) ON DELETE CASCADE,
  CONSTRAINT `dog_colors_ibfk_2` FOREIGN KEY (`color_id`) REFERENCES `colors` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dog_colors`
--

LOCK TABLES `dog_colors` WRITE;
/*!40000 ALTER TABLE `dog_colors` DISABLE KEYS */;
INSERT INTO `dog_colors` VALUES (2,2),(2,3),(3,1),(3,4);
/*!40000 ALTER TABLE `dog_colors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dog_relations`
--

DROP TABLE IF EXISTS `dog_relations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dog_relations` (
  `dog_id` int(11) NOT NULL,
  `related_dog_id` int(11) NOT NULL,
  PRIMARY KEY (`dog_id`,`related_dog_id`),
  KEY `related_dog_id` (`related_dog_id`),
  CONSTRAINT `dog_relations_ibfk_1` FOREIGN KEY (`dog_id`) REFERENCES `dogs` (`id`) ON DELETE CASCADE,
  CONSTRAINT `dog_relations_ibfk_2` FOREIGN KEY (`related_dog_id`) REFERENCES `dogs` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dog_relations`
--

LOCK TABLES `dog_relations` WRITE;
/*!40000 ALTER TABLE `dog_relations` DISABLE KEYS */;
INSERT INTO `dog_relations` VALUES (3,4),(4,3);
/*!40000 ALTER TABLE `dog_relations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dogs`
--

DROP TABLE IF EXISTS `dogs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dogs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `sexo` enum('Macho','Hembra') NOT NULL,
  `edad` int(11) NOT NULL CHECK (`edad` >= 0),
  `color` enum('Negro','Café','Rubio','Blanco') NOT NULL,
  `tipo` enum('Senior','Adulto','Cachorro') NOT NULL,
  `personalidad_personas` enum('Cariñoso','Tímido','Normal') NOT NULL,
  `carácter` enum('Juguetón','Tranquilo','Asustadizo','Guardián') NOT NULL,
  `nivel_energia` enum('Bajo','Medio-Bajo','Medio','Medio-Alto','Alto') NOT NULL,
  `esterilizado` enum('Sí','No','Consultar') NOT NULL,
  `vacunas` enum('Sí','No','Consultar') NOT NULL,
  `personalidad_perros` enum('Sociable','Selectiva','Solitaria') NOT NULL,
  `tamaño` enum('Grande','Mediano','Pequeño') NOT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dogs`
--

LOCK TABLES `dogs` WRITE;
/*!40000 ALTER TABLE `dogs` DISABLE KEYS */;
INSERT INTO `dogs` VALUES (1,'Fantasma','Hembra',10,'Negro','Adulto','Cariñoso','Juguetón','Medio','Sí','No','Sociable','Grande','http://192.168.0.6:3000/assets/images/perros/perro1.png'),(2,'Nico','Macho',12,'Negro','Senior','Tímido','Tranquilo','Medio','Sí','Sí','Sociable','Grande','http://192.168.0.6:3000/assets/images/perros/perro2.png'),(3,'Vainilla','Hembra',11,'Rubio','Senior','Tímido','Juguetón','Medio','Sí','Sí','Sociable','Mediano','http://192.168.0.6:3000/assets/images/perros/perro3.png'),(4,'Toby','Macho',11,'Café','Senior','Tímido','Tranquilo','Medio','Sí','Sí','Sociable','Grande','http://192.168.0.6:3000/assets/images/perros/perro4.png'),(5,'Orión','Macho',0,'Negro','Cachorro','Cariñoso','Juguetón','Alto','Consultar','Consultar','Sociable','Mediano','http://192.168.0.6:3000/assets/images/perros/perro5.png');
/*!40000 ALTER TABLE `dogs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favorites`
--

DROP TABLE IF EXISTS `favorites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `favorites` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `dog_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_user_dog` (`user_id`,`dog_id`),
  KEY `dog_id` (`dog_id`),
  CONSTRAINT `favorites_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `favorites_ibfk_2` FOREIGN KEY (`dog_id`) REFERENCES `dogs` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorites`
--

LOCK TABLES `favorites` WRITE;
/*!40000 ALTER TABLE `favorites` DISABLE KEYS */;
INSERT INTO `favorites` VALUES (1,1,1),(4,1,2),(2,1,4);
/*!40000 ALTER TABLE `favorites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'naxo','123@gmail.com','naxo'),(2,'hola','hola@gmail.com','hola'),(3,'chao','chao@gmail.com','chao');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-08 20:39:48
