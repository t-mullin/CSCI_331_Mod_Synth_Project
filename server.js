var express = require('express');
var path = require('path');
var app = express();


const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://dbUser:dbPass@presets-cluster.h4at5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', () => {
   console.log('Connected to Mongo DB Successfully!');
});

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

var indexRouter = require('./routes/index');

app.use('/', indexRouter);

var port = 3000;

app.listen(process.env.PORT || 3000, () => {
   console.log(`Server listening on port ${port}`);
});