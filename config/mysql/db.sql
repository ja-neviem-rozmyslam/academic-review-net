-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `defaultdb` DEFAULT CHARACTER SET utf8 ;
-- -----------------------------------------------------
-- Schema defaultdb
-- -----------------------------------------------------
USE `defaultdb` ;

-- -----------------------------------------------------
-- Table `defaultdb`.`roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `defaultdb`.`roles` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `role` VARCHAR(45) NOT NULL,
  `roleIdent` VARCHAR(2) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `defaultdb`.`universities`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `defaultdb`.`universities` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `university_name` VARCHAR(512) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `defaultdb`.`faculties`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `defaultdb`.`faculties` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `faculty_name` VARCHAR(512) NOT NULL,
  `university_id` BIGINT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_faculties_universities_idx` (`university_id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `defaultdb`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `defaultdb`.`users` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `surname` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `registration_date` TIMESTAMP NOT NULL,
  `faculties_id` BIGINT NULL,
  `universities_id` BIGINT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_users_faculties1_idx` (`faculties_id` ASC) VISIBLE,
  INDEX `fk_users_universities1_idx` (`universities_id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `defaultdb`.`theses_states`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `defaultdb`.`theses_states` (
  `stateIdent` VARCHAR(2) NOT NULL,
  `state` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`stateIdent`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `defaultdb`.`conference_states`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `defaultdb`.`conference_states` (
  `stateIdent` VARCHAR(2) NOT NULL,
  `state` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`stateIdent`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `defaultdb`.`conferences`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `defaultdb`.`conferences` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `conference_name` VARCHAR(255) NOT NULL,
  `upload_deadline` DATETIME NOT NULL,
  `review_deadline` DATETIME NOT NULL,
  `creation_date` TIMESTAMP NOT NULL,
  `conference_state` VARCHAR(2) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_conferences_conference_states1_idx` (`conference_state` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `defaultdb`.`uploaded_theses`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `defaultdb`.`uploaded_theses` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `thesis_title` VARCHAR(255) NOT NULL,
  `abstract_sk` LONGTEXT NOT NULL,
  `abstract_en` LONGTEXT NOT NULL,
  `folder_hash` TINYTEXT NOT NULL,
  `timestamp` TIMESTAMP NOT NULL,
  `student_id` BIGINT NOT NULL,
  `reviewer_id` BIGINT NULL,
  `conferences_id` BIGINT NOT NULL,
  `these_state` VARCHAR(2) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_uploaded_theses_theses_states1_idx` (`these_state` ASC) VISIBLE,
  INDEX `fk_uploaded_theses_users1_idx` (`reviewer_id` ASC) VISIBLE,
  INDEX `fk_uploaded_theses_users2_idx` (`student_id` ASC) VISIBLE,
  INDEX `fk_uploaded_theses_conferences1_idx` (`conferences_id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `defaultdb`.`email_domains`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `defaultdb`.`email_domains` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `email_domain` VARCHAR(45) NOT NULL,
  `universities_id` BIGINT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_email_domains_universities1_idx` (`universities_id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `defaultdb`.`rating_categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `defaultdb`.`rating_categories` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `question` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `defaultdb`.`user_roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `defaultdb`.`user_roles` (
  `role_id` BIGINT NOT NULL,
  `user_id` BIGINT NOT NULL,
  PRIMARY KEY (`role_id`, `user_id`),
  INDEX `fk_roles_has_users_users1_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_roles_has_users_roles1_idx` (`role_id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `defaultdb`.`users_in_conferences`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `defaultdb`.`users_in_conferences` (
  `conferences_id` BIGINT NOT NULL,
  `users_id` BIGINT NOT NULL,
  PRIMARY KEY (`conferences_id`, `users_id`),
  INDEX `fk_conferences_has_users_users1_idx` (`users_id` ASC) VISIBLE,
  INDEX `fk_conferences_has_users_conferences1_idx` (`conferences_id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `defaultdb`.`theses_ratings`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `defaultdb`.`theses_ratings` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `category_id` BIGINT NOT NULL,
  `user_id` BIGINT NOT NULL,
  `rating` INT NOT NULL,
  `comment` VARCHAR(255) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_users_has_rating_categories_rating_categories1_idx` (`category_id` ASC) VISIBLE,
  INDEX `fk_users_has_rating_categories_users1_idx` (`id` ASC) VISIBLE,
  INDEX `fk_theses_ratings_uploaded_theses1_idx` (`user_id` ASC) VISIBLE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
