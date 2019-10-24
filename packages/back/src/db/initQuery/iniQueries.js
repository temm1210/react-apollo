import { userFields, boardFields } from "../schemas";

const createUserSql = `create table IF NOT EXISTS USER(
  ${userFields.EMAIL} varchar(255) primary key,
  ${userFields.PASSWORD} varchar(255) not null,
  ${userFields.USERNAME} varchar(255) unique not null,
  ${userFields.USER_PIC} varchar(255),
  ${userFields.SALT} varchar(255) not null,
  ${userFields.REFRESH_TOKEN} varchar(255),
  ${userFields.CREATE_DATE} DATETIME DEFAULT CURRENT_TIMESTAMP,
  ${userFields.UPDATE_DATE} DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE current_timestamp
) ENGINE=InnoDB DEFAULT CHARSET=utf8;`;

const createBoardSql = `create table IF NOT EXISTS BOARD(
  ${boardFields.ID} INT unsigned PRIMARY KEY AUTO_INCREMENT,
  ${boardFields.USERNAME} VARCHAR(255) NOT NULL,
  ${boardFields.TITLE} VARCHAR(255) NOT NULL,
  ${boardFields.CONTENT} TEXT NOT NULL,
  ${boardFields.LIKES} INT unsigned default '0',
  ${boardFields.VIEWS} INT unsigned default '0',
  ${boardFields.REPRESENT_IMG} VARCHAR(255) NOT NULL,
  ${boardFields.CREATE_DATE} DATETIME DEFAULT CURRENT_TIMESTAMP,
  ${boardFields.UPDATE_DATE} DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE current_timestamp,
  
  FOREIGN KEY(${boardFields.USERNAME}) REFERENCES USER(${userFields.USERNAME}) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;`;

export default [createUserSql, createBoardSql];
