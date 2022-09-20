# Routes


Piggly Wiggly

This application displays the list of Piggly Wiggly's products. Each product belongs to a specific category (Fruit, Vegetables, Dairy, Meat). With this application, the user is able to :

-sort the products alphabetically 
-sort the product via category
-increment and decrement the inventory of product
-send an email when the product's inventory is empty.


To run the application:


-fork the repository and clone it into your machine
-cd to the project folder and run $ npm install
-to start the server, run $ npm start. The server should run on port 3001.
-In a separate terminal, run npm run db to start the database
-In your browser, run localhost:3000 to see the application

I used emailJS to allow the user to send an email. To do the same, you may need to go to https://www.emailjs.com/ and set up an account. After logging in, you will need to create a service ID, a template ID, and a public key and drop those keys in a .env file (which you will also create in the project folder). The variables I have given these keys are in the .env.example file. 