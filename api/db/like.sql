CREATE TABLE IF NOT EXISTS likes(
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    author_id INT UNSIGNED NOT NULL,
    publish_date VARCHAR(100) NOT NULL,
    entity_type ENUM('post', 'comment') NOT NULL,
    entity_id TEXT NOT NULL,
    type ENUM('like', 'dislike') NOT NULL,
    FOREIGN KEY (author_id) REFERENCES user(id) ON DELETE CASCADE
);