-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

CREATE SCHEMA IF NOT EXISTS `arn` DEFAULT CHARACTER SET utf8mb4 ;
USE `arn` ;

-- -----------------------------------------------------
-- Table `arn`.`universities`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `arn`.`universities` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `university_name` VARCHAR(512) NOT NULL,
    PRIMARY KEY (`id`))
    ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `arn`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `arn`.`users` (
    `id` VARCHAR(36) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `surname` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `registration_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `university_id` BIGINT NULL,
    `verified` TINYINT NOT NULL,
    PRIMARY KEY (`id`),
    INDEX `fk_users_universities1_idx` (`university_id` ASC) VISIBLE)
    ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `arn`.`conferences`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `arn`.`conferences` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `conference_name` VARCHAR(45) NOT NULL,
    `password` VARCHAR(45) NULL,
    `upload_deadline` DATETIME NOT NULL,
    `review_deadline` DATETIME NOT NULL,
    `creation_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `faculty` VARCHAR(45) NOT NULL,
    `review_form` JSON NULL,
    `closed` TINYINT NULL,
    PRIMARY KEY (`id`))
    ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `arn`.`thesis_types`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `arn`.`thesis_types` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(45) NOT NULL,
    PRIMARY KEY (`id`))
    ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `arn`.`uploaded_theses`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `arn`.`uploaded_theses` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `thesis_title` VARCHAR(255) NOT NULL,
    `type_id` BIGINT NOT NULL,
    `abstract_sk` LONGTEXT NOT NULL,
    `abstract_en` LONGTEXT NOT NULL,
    `timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `conference_id` BIGINT NOT NULL,
    `author_id` VARCHAR(36) NOT NULL,
    `coauthors` VARCHAR(512) NULL,
    `reviewer_id` VARCHAR(36) NULL,
    `review` JSON NULL,
    PRIMARY KEY (`id`),
    INDEX `fk_uploaded_theses_conferences1_idx` (`conference_id` ASC) VISIBLE,
    INDEX `fk_uploaded_theses_users1_idx` (`reviewer_id` ASC) VISIBLE,
    INDEX `fk_uploaded_theses_theses_categories1_idx` (`type_id` ASC) VISIBLE,
    INDEX `fk_uploaded_theses_users2_idx` (`author_id` ASC) VISIBLE)
    ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `arn`.`email_domains`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `arn`.`email_domains` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `email_domain` VARCHAR(45) NOT NULL,
    `university_id` BIGINT NOT NULL,
    PRIMARY KEY (`id`),
    INDEX `fk_email_domains_universities1_idx` (`university_id` ASC) VISIBLE)
    ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `arn`.`users_in_conferences`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `arn`.`users_in_conferences` (
    `user_id` VARCHAR(36) NOT NULL,
    `conference_id` BIGINT NOT NULL,
    PRIMARY KEY (`user_id`, `conference_id`),
    INDEX `fk_conferences_has_users_users1_idx` (`user_id` ASC) VISIBLE,
    INDEX `fk_conferences_has_users_conferences1_idx` (`conference_id` ASC) VISIBLE)
    ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `arn`.`roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `arn`.`roles` (
    `user_id` VARCHAR(36) NOT NULL,
    `role_ident` VARCHAR(2) NOT NULL,
    PRIMARY KEY (`user_id`, `role_ident`),
    INDEX `fk_users_has_roles_users1_idx` (`user_id` ASC) VISIBLE)
    ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `arn`.`tokens`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `arn`.`tokens` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `token` VARCHAR(255) NOT NULL,
    `user_id` VARCHAR(36) NOT NULL,
    `expiration_time` TIMESTAMP NOT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `token_type` VARCHAR(45) NOT NULL,
    PRIMARY KEY (`id`),
    INDEX `fk_password_reset_tokens_users1_idx` (`user_id` ASC) VISIBLE)
    ENGINE = InnoDB;

USE `arn` ;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
