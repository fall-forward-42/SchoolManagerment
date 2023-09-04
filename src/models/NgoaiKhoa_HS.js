const mongoose = require('mongoose')
const Schema = mongoose.Schema
var NgoaiKhoa_HS = new Schema({
    CauLacBo:String,
    VaiTro:String,
    ThoiGian:Date,
    ThanhTich:String,
    HocSinhID:{type:String,require:true}
})
module.exports = mongoose.model('NgoaiKhoa_HS',NgoaiKhoa_HS )