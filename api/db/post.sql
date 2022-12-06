CREATE TABLE IF NOT EXISTS post(
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    author_id INT UNSIGNED NOT NULL,
    title VARCHAR(255) NOT NULL,
    publish_date VARCHAR(100) NOT NULL,
    status ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
    content TEXT NOT NULL,
    FOREIGN KEY (author_id) REFERENCES user(id) ON DELETE CASCADE
);

