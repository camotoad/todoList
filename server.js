const express = require('express');
const app = express();

app.use(express.static('./'));
app.get('/', function(req, res){
    res.render('index', { title: 'My Todo list'});
});

app.listen(3000);
console.log('Server running at http://localhost:3000/');