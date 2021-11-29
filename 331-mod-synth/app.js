var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);


module.exports = app;

var MongoClient = require("mongodb").MongoClient;
var url = "mongodb+srv://dbUser:dbPass@cluster0.h4at5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";


MongoClient.connect(url, async function (err, client) {
    var db= client.db('PresetDB');
    if (err) throw err;
    let presetsArr = await db.collection("Presets").find( { } ).toArray();
    client.close();
});
