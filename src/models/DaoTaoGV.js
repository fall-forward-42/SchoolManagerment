const mongoose = require('mongoose')
const Schema = mongoose.Schema
var DaoTaoGiaoVien = new Schema({
    GiaoVienID:{type:String,require:true},
    TruongDaiHoc:String,
    ChuyenNganh:String,
    ChungChi:String,
    BangCap:String,
})
module.exports = mongoose.model('DaoTaoGiaoVien', DaoTaoGiaoVien)