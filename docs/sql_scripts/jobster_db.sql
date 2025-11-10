CREATE DATABASE IF NOT EXISTS Jobster;
USE Jobster;


CREATE TABLE IF NOT EXISTS user_info (
	user_id INT NOT NULL UNIQUE AUTO_INCREMENT,
    user_name VARCHAR(250) UNIQUE NOT NULL,
    user_password VARCHAR(250) NOT NULL,
    user_email VARCHAR(250) NOT NULL,
    user_phone VARCHAR(10),
    user_description VARCHAR(200),
	PRIMARY KEY (user_id)
);

CREATE TABLE IF NOT EXISTS reviews (
	review_id INT NOT NULL UNIQUE AUTO_INCREMENT,
	review_text VARCHAR(200),
    review_rating INT(1) NOT NULL,
    user_id INT NOT NULL,
    PRIMARY KEY (review_id),
    FOREIGN KEY (user_id) REFERENCES user_info(user_id)
);

INSERT INTO user_info (user_name, user_password, user_email, user_phone, user_description)
VALUES ('Daniil', 'qwerty123', 'example@gmail.com', '2345678967', "This is an example of the user's description");

INSERT INTO reviews (review_text, review_rating, user_id)
VALUES ("This is an example №1 of the user's review", '5', '1'),
		("This is an example №2 of the user's review", '2', '1'),
		("This is an example №3 of the user's review", '4', '1');
