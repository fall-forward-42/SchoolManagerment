const mongoose = require('mongoose')
const Schema = mongoose.Schema
var LopHoc = new Schema({
    TenLop:String,
    BatDau:Date,
    KetThuc:Date,
    SoLuong:Number,
    GVCN:String,
})
module.exports = mongoose.model('LopHoc', LopHoc)