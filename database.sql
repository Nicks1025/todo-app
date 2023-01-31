CREATE DATABASE todo_database;

CREATE TABLE todo(id SERIAL PRIMARY KEY,username varchar(200), password varchar(200), name VARCHAR(200), activity varchar(255) , status varchar(255), type varchar(20));  

CREATE TABLE todo(id SERIAL PRIMARY KEY,username varchar(200), activity varchar(255), status varchar(30));  


CREATE TABLE users(id SERIAL PRIMARY KEY, name varchar(255), username varchar(200), password varchar(200), type varchar(20));  

CREATE TABLE admin(id SERIAL PRIMARY KEY, name varchar(255), username varchar(200), password varchar(200), type varchar(20));  
