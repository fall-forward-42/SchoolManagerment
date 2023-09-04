const mongoose = require('mongoose')
const Schema = mongoose.Schema
var CongTacGiaoVien = new Schema({
    GiaoVienID:{type:String,require:true},
    ChucVu:String,
    MonHoc:String,
    NgayBatDau:Date
})
module.exports = mongoose.model('CongTacGiaoVien', CongTacGiaoVien)


