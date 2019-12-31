var express = require('express');
var app = express();
var authroute = require('./routes');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require("express-session");
var passport = require('passport');

// SET MIDDLEWARES
app.set('view engine', 'ejs');
app.use(session({ secret: "cats" ,resave : false , saveUninitialized : false,cookie:{
    maxAge : 24*60*60
}}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', authroute);
mongoose.connect('mongodb://localhost/oauth',{ useNewUrlParser: true , useUnifiedTopology : true })
.then(()=>{
    console.log('database connected');
})

// CREATE HOME ROUTE
app.get('/', (req, res) => {
    res.render('home');
})
app.get('/login', (req, res) => {
    res.render('login');
})
app.get('/logout',(req,res)=>{
    // handle with passport
})



app.listen('8000', (req, res) => {
    console.log('listening to port 8000 ')
})
