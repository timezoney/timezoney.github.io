CREATE DATABASE IF NOT EXISTS Jobster;
USE Jobster;


CREATE TABLE IF NOT EXISTS user_info (
	user_id INT NOT NULL UNIQUE AUTO_INCREMENT,
    user_name VARCHAR(50) UNIQUE NOT NULL,
    user_password VARCHAR(50) NOT NULL,
    user_email VARCHAR(30) NOT NULL,
    user_phone VARCHAR(20),
    user_description VARCHAR(200),
	PRIMARY KEY (user_id)
)
