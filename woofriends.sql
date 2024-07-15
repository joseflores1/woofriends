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
  `edad` varchar(50) NOT NULL,
  `color` enum('Negro','Café','Rubio','Blanco') NOT NULL,
  `tipo` enum('Senior','Adulto','Cachorro') NOT NULL,
  `personalidad_personas` enum('Cariñoso','Tímido','Normal') NOT NULL,
  `carácter` enum('Juguetón','Tranquilo','Asustadizo','Guardián','Normal') NOT NULL,
  `nivel_energia` enum('Bajo','Medio-Bajo','Medio','Medio-Alto','Alto') NOT NULL,
  `esterilizado` enum('Sí','No','Consultar') NOT NULL,
  `vacunas` enum('Sí','No','Consultar') NOT NULL,
  `personalidad_perros` enum('Sociable','Selectiva','Solitaria','Normal') NOT NULL,
  `tamaño` enum('Grande','Mediano','Pequeño','Muy Grande','En Crecimiento') NOT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dogs`
--

LOCK TABLES `dogs` WRITE;
/*!40000 ALTER TABLE `dogs` DISABLE KEYS */;
INSERT INTO `dogs` VALUES (1,'Fantasma','Hembra','10','Negro','Senior','Cariñoso','Juguetón','Medio','Sí','No','Sociable','Grande','http://192.168.0.6:3000/assets/images/perros/perro1.png'),(2,'Nico','Macho','12','Negro','Senior','Tímido','Tranquilo','Medio','Sí','Sí','Sociable','Grande','http://192.168.0.6:3000/assets/images/perros/perro2.png'),(3,'Toby','Macho','11','Café','Senior','Tímido','Tranquilo','Medio','Sí','Sí','Sociable','Grande','http://192.168.0.6:3000/assets/images/perros/perro3.png'),(4,'NN','Macho','11','Café','Senior','Cariñoso','Normal','Medio','No','Sí','Sociable','Mediano','http://192.168.0.6:3000/assets/images/perros/perro4.png'),(5,'Maruja','Hembra','11','Café','Senior','Cariñoso','Normal','Bajo','Sí','No','Sociable','Grande','http://192.168.0.6:3000/assets/images/perros/perro5.png'),(6,'Valentina','Hembra','14','Café','Senior','Cariñoso','Tranquilo','Bajo','Sí','No','Sociable','Mediano','http://192.168.0.6:3000/assets/images/perros/perro6.png'),(7,'Payasito Hijo','Macho','6','Negro','Senior','Tímido','Normal','Medio','Sí','No','Normal','Mediano','http://192.168.0.6:3000/assets/images/perros/perro7.png'),(8,'Payasito Papá','Macho','10','Negro','Senior','Cariñoso','Tranquilo','Bajo','Sí','No','Normal','Mediano','http://192.168.0.6:3000/assets/images/perros/perro8.png'),(9,'Bonita','Hembra','12','Negro','Senior','Tímido','Tranquilo','Bajo','Sí','No','Sociable','Mediano','http://192.168.0.6:3000/assets/images/perros/perro9.png'),(10,'Miriam','Hembra','10','Negro','Senior','Tímido','Asustadizo','Bajo','Consultar','Consultar','Normal','Mediano','http://192.168.0.6:3000/assets/images/perros/perro10.png'),(11,'Alice','Hembra','5','Rubio','Adulto','Tímido','Normal','Medio','Sí','Sí','Sociable','Pequeño','http://192.168.0.6:3000/assets/images/perros/perro11.png'),(12,'Sol','Hembra','2','Negro','Adulto','Tímido','Tranquilo','Medio','Sí','Sí','Sociable','Pequeño','http://192.168.0.6:3000/assets/images/perros/perro12.png'),(13,'Chuleta','Hembra','4','Negro','Adulto','Cariñoso','Juguetón','Alto','Sí','Sí','Normal','Mediano','http://192.168.0.6:3000/assets/images/perros/perro13.png'),(14,'Julita','Hembra','12','Negro','Senior','Cariñoso','Juguetón','Medio','Consultar','Consultar','Selectiva','Grande','http://192.168.0.6:3000/assets/images/perros/perro14.png'),(15,'Lola','Hembra','6','Negro','Adulto','Cariñoso','Juguetón','Medio','Sí','No','Normal','Mediano','http://192.168.0.6:3000/assets/images/perros/perro15.png'),(16,'Josefa','Hembra','5','Negro','Adulto','Tímido','Tranquilo','Medio','Sí','Sí','Normal','Mediano','http://192.168.0.6:3000/assets/images/perros/perro16.png'),(17,'Kora','Hembra','6','Negro','Adulto','Cariñoso','Juguetón','Medio','Sí','Sí','Sociable','Mediano','http://192.168.0.6:3000/assets/images/perros/perro17.png'),(18,'Kuky','Hembra','7','Negro','Adulto','Normal','Normal','Medio','Sí','Sí','Sociable','Muy Grande','http://192.168.0.6:3000/assets/images/perros/perro18.png'),(19,'Amparo','Hembra','3','Rubio','Adulto','Tímido','Normal','Medio','Sí','No','Normal','Mediano','http://192.168.0.6:3000/assets/images/perros/perro19.png'),(20,'Lucero','Hembra','1','Rubio','Adulto','Tímido','Juguetón','Medio','Sí','No','Normal','Mediano','http://192.168.0.6:3000/assets/images/perros/perro20.png'),(21,'Niña','Hembra','10','Negro','Senior','Cariñoso','Normal','Medio','Consultar','Consultar','Normal','Muy Grande','http://192.168.0.6:3000/assets/images/perros/perro21.png'),(22,'Hachiko','Macho','12','Negro','Senior','Tímido','Guardián','Medio','Sí','Sí','Selectiva','Muy Grande','http://192.168.0.6:3000/assets/images/perros/perro22.png'),(23,'Risitas','Hembra','10','Negro','Senior','Tímido','Juguetón','Medio','Consultar','Consultar','Normal','Mediano','http://192.168.0.6:3000/assets/images/perros/perro23.png'),(24,'Orejitas','Hembra','5','Negro','Adulto','Cariñoso','Juguetón','Medio','Sí','Sí','Normal','Grande','http://192.168.0.6:3000/assets/images/perros/perro24.png'),(25,'Kira','Hembra','10','Café','Senior','Cariñoso','Juguetón','Alto','Sí','Sí','Normal','Grande','http://192.168.0.6:3000/assets/images/perros/perro25.png'),(26,'Sofía','Hembra','12','Rubio','Senior','Tímido','Guardián','Medio','Sí','Sí','Solitaria','Mediano','http://192.168.0.6:3000/assets/images/perros/perro26.png'),(27,'Gemela 1','Hembra','5','Café','Adulto','Cariñoso','Guardián','Alto','Sí','Sí','Normal','Grande','http://192.168.0.6:3000/assets/images/perros/perro27.png'),(28,'Gemela 2','Hembra','5','Café','Adulto','Cariñoso','Guardián','Medio','Sí','Sí','Normal','Grande','http://192.168.0.6:3000/assets/images/perros/perro28.png'),(29,'Luli','Hembra','9','Café','Senior','Tímido','Normal','Medio','Sí','Sí','Sociable','Mediano','http://192.168.0.6:3000/assets/images/perros/perro29.png'),(30,'Vainilla','Hembra','11','Rubio','Senior','Tímido','Juguetón','Medio','Sí','Sí','Sociable','Mediano','http://192.168.0.6:3000/assets/images/perros/perro30.png');
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorites`
--

LOCK TABLES `favorites` WRITE;
/*!40000 ALTER TABLE `favorites` DISABLE KEYS */;
INSERT INTO `favorites` VALUES (1,1,1),(2,1,2),(3,1,4),(4,1,6);
/*!40000 ALTER TABLE `favorites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `preferences`
--

DROP TABLE IF EXISTS `preferences`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `preferences` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `sexo` enum('Macho','Hembra') DEFAULT NULL,
  `color` enum('Negro','Café','Rubio','Blanco') DEFAULT NULL,
  `tipo` enum('Senior','Adulto','Cachorro') DEFAULT NULL,
  `personalidad_personas` enum('Cariñoso','Tímido','Normal') DEFAULT NULL,
  `carácter` enum('Juguetón','Tranquilo','Asustadizo','Guardián') DEFAULT NULL,
  `nivel_energia` enum('Bajo','Medio-Bajo','Medio','Medio-Alto','Alto') DEFAULT NULL,
  `esterilizado` enum('Sí','No','Consultar') DEFAULT NULL,
  `vacunas` enum('Sí','No','Consultar') DEFAULT NULL,
  `personalidad_perros` enum('Sociable','Selectiva','Solitaria') DEFAULT NULL,
  `tamaño` enum('Grande','Mediano','Pequeño') DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `preferences_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `preferences`
--

LOCK TABLES `preferences` WRITE;
/*!40000 ALTER TABLE `preferences` DISABLE KEYS */;
INSERT INTO `preferences` VALUES (1,1,'Hembra','Negro','Senior','Cariñoso','Juguetón','Medio','Sí','No','Sociable','Grande');
/*!40000 ALTER TABLE `preferences` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'adminuai','adminuai@uai.cl','adminuai');
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

-- Dump completed on 2024-07-15 13:21:24
