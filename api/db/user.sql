CREATE TABLE IF NOT EXISTS user(
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    login VARCHAR(69) NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) DEFAULT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    profile_pic VARCHAR(255) DEFAULT "default.png",
    rating INT DEFAULT NULL,
    is_active BOOLEAN DEFAULT FALSE,
    activation_link VARCHAR(255) DEFAULT NULL,
    role ENUM('admin', 'user') NOT NULL DEFAULT 'user'
);

