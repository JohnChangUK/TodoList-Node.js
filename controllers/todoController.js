var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Connect to the mLab database / mongoose 
mongoose.connect('mongodb://todo:todo@ds143000.mlab.com:43000/todolist');

mongoose.Promise = global.Promise;

//Create a database schema - this is like a Blueprint
var todoSchema = new mongoose.Schema({ 
    item: String
  });

var Todo = mongoose.model('Todo', todoSchema);

// var data = [
//   {item: 'Create an app with React.js'},
//   {item: 'Create a web app with Node.js'},
//   {item: 'Implement Socket.io'}
// ];

var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app) {

  app.get('/todo', function(req, res) {
    //Get data from mongodb and pass it to the view
    Todo.find({}, function(err, data) {
      if (err) throw err;
      res.render('todo', {todos: data});
    });
  });

  app.post('/todo', urlencodedParser, function(req, res) {
    //Get data from the view, then add it to mongodb
    var newTodo = Todo(req.body).save(function(err, data) {
      if (err) throw err;
      res.json(data);
    });
  }); 

  app.delete('/todo/:item', function(req, res) {
    //Delete the requested item from mongodb
    Todo.find({ item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data) {
      if (err) throw err;
      res.json(data);
    });
  });

};