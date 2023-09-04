const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParse = require('body-parser')
const  passport = require("passport")
const LocalStrategy = require("passport-local")
const passportLocalMongoose = require("passport-local-mongoose")
const { engine }  = require('express-handlebars')
const path = require('path')
const { rename } = require('fs')
const flash = require('connect-flash')
const jwt = require('jsonwebtoken')
const env = require('dotenv').config()
const cookieParser = require('cookie-parser')

const app = express()
const PORT = process.env.PORT || 3000




//router
const route = require('./routes/index')

//models
const User = require('./models/User')

                                                    //DATABASE
mongoose.connect('mongodb://localhost:27017/QuanLyTruongHoc')
const db = mongoose.connection

db.on('err',(err)=>{
    console.log(err)
})

db.once('open',()=>{
    console.log('data open successly')
})


                                                //middleware




app.use(morgan('combined'))
app.use(bodyParse.urlencoded({extended:true}))
app.use(bodyParse.json())

app.use(require("express-session")({
    secret: "Rusty is a dog",
    resave: true,
    saveUninitialized: true
}));
app.use(flash()) 
app.use(cookieParser())

//static file send img
app.use(express.static(path.join(__dirname, 'public')));


//template engine
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'resources/views'))



//authen
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

route(app)

//use flash
// app.use(function(req,res,next){
//     res.locals.message = req.flash()
//     next()
// })

app.get('/',(req,res)=>{
    res.render('home')
})

app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`)
})
