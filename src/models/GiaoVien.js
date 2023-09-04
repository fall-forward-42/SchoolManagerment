const mongoose = require('mongoose')
const Schema = mongoose.Schema
var GiaoVien = new Schema({
    HoTen:String,
    avatar:String,
    NgayThangSinh:Date,
    DiaChi:String,
    Email:String,
    GioiTinh:String,
    SDT:String,
})
module.exports = mongoose.model('GiaoVien', GiaoVien)