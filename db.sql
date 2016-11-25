CREATE SCHEMA IF NOT EXISTS `stugov_legislation` DEFAULT CHARACTER SET utf8;

CREATE TABLE IF NOT EXISTS `stugov_legislation`.`bodies` (
  `body_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(256) NOT NULL,
  `legislation_prefix` VARCHAR(3) NOT NULL,
  PRIMARY KEY (`body_id`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `stugov_legislation`.`sessions` (
  `session_id` INT NOT NULL AUTO_INCREMENT,
  `body_id` INT NOT NULL,
  `name` VARCHAR(256) NOT NULL,
  `year_num` INT NOT NULL,
  `start_year` INT NOT NULL,
  `end_year` INT NOT NULL,
  PRIMARY KEY (`session_id`),
  INDEX `sessions_fk1_idx` (`body_id` ASC),
  CONSTRAINT `sessions_fk1`
    FOREIGN KEY (`body_id`)
    REFERENCES `stugov_legislation`.`bodies` (`body_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `stugov_legislation`.`member_info` (
  `info_id` INT NOT NULL AUTO_INCREMENT,
  `body_id` INT NOT NULL,
  `name` VARCHAR(256) NOT NULL,
  `is_committee` TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`info_id`),
  INDEX `member_info_fk1_idx` (`body_id` ASC),
  CONSTRAINT `member_info_fk1`
    FOREIGN KEY (`body_id`)
    REFERENCES `stugov_legislation`.`bodies` (`body_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `stugov_legislation`.`members` (
  `member_id` INT NOT NULL AUTO_INCREMENT,
  `info_id` INT NOT NULL,
  `body_id` INT NOT NULL,
  `session_id` INT NOT NULL,
  `position` VARCHAR(256) NULL,
  PRIMARY KEY (`member_id`),
  INDEX `members_fk1_idx` (`info_id` ASC, `body_id` ASC),
  INDEX `members_fk2_idx` (`body_id` ASC),
  INDEX `members_fk3_idx` (`session_id` ASC),
  CONSTRAINT `members_fk1`
    FOREIGN KEY (`info_id` , `body_id`)
    REFERENCES `stugov_legislation`.`member_info` (`info_id` , `body_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `members_fk2`
    FOREIGN KEY (`body_id`)
    REFERENCES `stugov_legislation`.`bodies` (`body_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `members_fk3`
    FOREIGN KEY (`session_id`)
    REFERENCES `stugov_legislation`.`sessions` (`session_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `stugov_legislation`.`motions` (
  `motion_id` INT NOT NULL AUTO_INCREMENT,
  `body_id` INT NOT NULL,
  `session_id` INT NOT NULL,
  `moving_member_id` INT NULL,
  `seconding_member_id` INT NULL,
  `motion_num` INT NOT NULL,
  `meeting_num` INT NOT NULL,
  `votes_favor` INT NOT NULL,
  `votes_against` INT NOT NULL,
  `votes_abstentions` INT NOT NULL,
  `date` DATE NOT NULL,
  `text` TEXT NOT NULL,
  PRIMARY KEY (`motion_id`),
  INDEX `motions_fk1_idx` (`body_id` ASC),
  INDEX `motions_fk2_idx` (`session_id` ASC),
  INDEX `motions_fk3_idx` (`moving_member_id` ASC),
  INDEX `motions_fk4_idx` (`seconding_member_id` ASC),
  CONSTRAINT `motions_fk1`
    FOREIGN KEY (`body_id`)
    REFERENCES `stugov_legislation`.`bodies` (`body_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `motions_fk2`
    FOREIGN KEY (`session_id`)
    REFERENCES `stugov_legislation`.`sessions` (`session_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `motions_fk3`
    FOREIGN KEY (`moving_member_id`)
    REFERENCES `stugov_legislation`.`members` (`member_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `motions_fk4`
    FOREIGN KEY (`seconding_member_id`)
    REFERENCES `stugov_legislation`.`members` (`member_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;
