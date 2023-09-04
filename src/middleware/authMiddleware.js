const jwt = require('jsonwebtoken')
const env = require('dotenv').config()
const User = require('../models/User')
const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt
    if (token) {
        jwt.verify(token, process.env.ACCESS_TOKEN, (err, decodedToken) => {
            if (err) {
                //the token is not valid
                req.flash('error', 'Vui lòng đăng nhập !')
                res.redirect('/login')
            }
            else {
                next()//accept : countinue to allow to access route
            }
        })
    } else {
        //dont have token
        req.flash('error', 'Vui lòng đăng nhập !')
        res.redirect('/login')
    }
}
const checkUser =  (req, res, next) => {
    const token = req.cookies.jwt
    if (token) {
        jwt.verify(token, process.env.ACCESS_TOKEN, async (err, decodedToken) => {
            if (err) {
                res.locals.user = null
            }
            else {
                let user = await User.findById(decodedToken.id)
                res.cookie('userNameCurrent',user.username,{httpOnly:true})
                //use to find student
                res.locals.user = user//use for render private page - use for handlebars
                next()//accept : countinue to allow to access route
            }
        })
    } else {
        //dont have token
        res.locals.user = null
        next()
    }
}
module.exports = { requireAuth ,checkUser}