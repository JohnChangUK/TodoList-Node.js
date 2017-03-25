var express = require('express');
var todoController = require('./controllers/todoController');
var app = express();

//Setting up Template Engine 
app.set('view engine', 'ejs');

//Serving Static Files, such as css files, images, JavaScript files
app.use(express.static('./public'));

//Fire controllers
todoController(app);

app.listen(3000);
console.log("Listening on port 3000...")