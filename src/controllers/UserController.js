const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { redirect } = require('react-router-dom');

// Showing secret page
const secretGet = function (req, res) {
    res.render("secret");
};


  
//Showing login form
const loginGet =  function (req, res) {
    res.render("login",{messages:req.flash()});
};

//authentication
const validLogIn = [
  body('username').trim().custom(async (value,{req})=>{
    let user = await User.find({username: value})
    if(user.length > 0){
      if(user[0].password != req.body.password){
        throw  new Error("Mật khẩu không chính xác !")
      }
    }
    if(user.length<=0){
      throw new Error("Tài khoản không tồn tại !")
    }
    
  })
  //body('password').trim().isEmpty().withMessage("Vui lòng nhập mật khẩu")
]
const maxAge = 3*24*60*60 //3 days
//Handling user login
const loginPost = async function(req, res){
  
    const er = validationResult(req)
    
    if(!er.isEmpty()){
       res.render('login',{errors:er.mapped()})
       return
    }
    
    try {
            //authorization
            const user = await User.find({username: req.body.username})
            const accessToken = createToken(user[0]._id)
            res.cookie('jwt',accessToken,{httpOnly: true,maxAge: maxAge*1000})
            res.cookie('TypeOfAccount',user[0].typeAccount,{httpOnly:true})
            return res.redirect('/lop-hoc')

      } catch (error) {
        res.status(400).json({ error:"Can not access !" });
      }
};
//create token in here
function createToken(id){
  return  jwt.sign({id},process.env.ACCESS_TOKEN,{expiresIn: maxAge})
}
//authen
function authenticateToken(req,res,next){
  const authHeader = req.headers['authorization']
  //Beaer [token]
  const token = authHeader && authHeader.split(' ')[1]

  if(token == null)return res.sendStatus(401)

  jwt.verify(token,process.env.ACCESS_TOKEN,(err,user)=>{
    if(err) 
      return res.sendStatus(403)//forbidden: no authen to access
    req.user=user 
    console.log(err,user)
    next()// middleware move to new page immedately
  })  
}

  
  
/// check authen
const isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/login");
}

module.exports = {secretGet,loginGet,loginPost,isLoggedIn,validLogIn,authenticateToken}