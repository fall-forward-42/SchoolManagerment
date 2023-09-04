const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const specialChars = `\`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`;
// Showing register form
const registerGet = function (req, res) {
  res.render("register");
};
function containsSpecialChars(str) {
  const specialChars = `\`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`;

  const result = specialChars.split('').some(specialChar => {
    if (str.includes(specialChar)) {
      return true;
    }

    return false;
  });

  return result;
}
//valid form
const validForm =  [
  body('password').trim().isLength({min: 6}).withMessage("Mật Khẩu phải trên 6 ký tự")
  .custom((value)=>{
    return containsSpecialChars(value)
  }).withMessage("Mật khẩu phải kèm ký tự đặc biệt "),


  

  body('username').custom(async (value,{req})=>{
    const user = await User.find({username: value})
    if(user.length > 0){
      throw new Error("Tài khoản đã tồn tại")
    }else if(req.body.username.trim() === ""){
      throw new Error("Vui lòng nhập")
    }
  }),

  body('confirmPass')
  .custom((value,{req})=>{
    return value===req.body.password
  }).withMessage("Nhập lại không chính xác")
  


]
// Handling user signup
const registerPost =  async (req, res) => {
  const errors = validationResult(req)

  if(!errors.isEmpty()){
     res.render('register',{errors:errors.mapped()})
     return
    // errors.array().forEach(err=>{
    //   req.flash('error',err.msg)
    // })
    // return  res.render('register',{messages:req.flash()})  
  }

    const user = await User.create({
      username: req.body.username,
      password: req.body.password,
      typeAccount: req.body.typeAccount
    });
    const newUser = await user.save()
    
    //send notice success
    req.flash('success','Đăng Ký Thành Công <3')
    
     res.redirect('/login')
     return

  
};

module.exports = { registerGet, registerPost,validForm }