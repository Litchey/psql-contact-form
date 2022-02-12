CREATE DATABASE jwt;

CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT
    uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    user_storetype VARCHAR(255) NOT NULL,
    user_productlist VARCHAR(255) NOT NULL
);

-- INSERT INTO users (user_name, user_email,
--  user_password) VALUES ('litu', 
--  'litu@gmail.com', 'hello@000');