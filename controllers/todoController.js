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
var itemOne = Todo({ item: "Deploy a React.js App" }).save(function(err) {
  if (err) throw err;
  console.log('item saved');
});

var data = [
  {item: 'Create an app with React.js'},
  {item: 'Create a web app with Node.js'},
  {item: 'Implement Socket.io'}
];

var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app) {

  app.get('/todo', function(req, res) {
    res.render('todo', {todos: data});
  });

  app.post('/todo', urlencodedParser, function(req, res) {
    data.push(req.body);
    res.json(data);
  }); 

  app.delete('/todo/:item', function(req, res) {
    data = data.filter(function(todo) {
      return todo.item.replace(/ /g, '-') !== req.params.item;
    });
    res.json(data);
  });

};