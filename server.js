
var express = require('express');
var path = require('path');
var app = express();

var port = 8000;

app.listen(port, () => {
   console.log(`Server listening on port ${port}`);
});


const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://dbUser:dbPass@presets-cluster.h4at5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', () => {
   console.log('Connected to Mongo DB Successfully!');
});


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

var indexRouter = require('./routes/index');

app.use('/', indexRouter);
