const mongoose = require('mongoose')
const Schema = mongoose.Schema
var NguoiGiamHo_HS = new Schema({
    HoTen:String,
    SDT:String,
    Email:String,
    ChucVu:String,
    HocSinhID:{type:String,require:true}
})
module.exports = mongoose.model('NguoiGiamHo_HS',NguoiGiamHo_HS )