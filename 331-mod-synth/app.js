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

const MongoClient = require("mongodb").MongoClient;

var url = "mongodb+srv://dbUser:dbPass@presets-cluster.h4at5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

exports.getMongo = async function() {
    const client = await MongoClient.connect(url, {
        useNewUrlparser: true,
        useUnifiedTopology: true,
    });

    //const db = client.db("myFirstDatabase");
    console.log("db");
    client.db("myFirstDatabase").collection('presets').find( { 'preset name': '1' } ).toArray(function(err, res) {
        console.log(res);
    });
    //console.log(presets);
    client.close();
};

module.exports = app;

