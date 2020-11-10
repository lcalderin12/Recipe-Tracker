/*mysql -u root -p < seeds.sql*/  

DROP DATABASE IF EXISTS recipe_db;
-- Creates the "animals_db" database --
CREATE DATABASE recipe_db;
-- Makes it so all of the following code will affect animals_db --
USE recipe_db;

INSERT INTO Recipes(name, ingredient, category, content)
VALUES 
("Pizza", "Bread", "Italian", "Put in oven bake at 420 for 60min"),
("Hamburger", "Meat", "American", "Grill and flip!"), 
("Tacos", "Meat", "Mexican", "Shake and bake!");

-- SELECT * FROM Recipes;





