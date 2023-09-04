const mongoose = require('mongoose')
const Schema = mongoose.Schema
var HocSinh = new Schema({
    TenDangNhap:{
        type:String
    },
   HoTen:{
        type:String
   },
   GioiTinh:{
        type:String
   },
   NgayThangSinh:{
        type: Date
   },
   DiaChi:{
        type:String
   },
    Avatar:String

})
  
module.exports = mongoose.model('HocSinh', HocSinh)