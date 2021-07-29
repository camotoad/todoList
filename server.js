const express = require('express');
const mongoose = require('mongoose');
const app = express();

//configure express
app.use(express.static('./'));
app.get('/', function(req, res){
    res.render('index', { title: 'My Todo list'});
});

function configureMongoose(){
    const db = mongoose.connect('mongodb://localhost/todo-db');

    mongoose.connection.on("open", function(ref) {
        console.log("Connected to mongo server.");
      });
      
    mongoose.connection.on("error", function(err) {
        console.log("Could not connect to mongo server!");
        console.log(err);
      });

    require('./model');

    return db;
}

//configure mongoose
const db = configureMongoose();


app.listen(3000);

console.log('Server running at http://localhost:3000/');

//testing
// const testdb = require('mongoose').model('todo');
// const t = new testdb({item: 'hi', status: true});
// t.save();