const mongoose = require('mongoose')
const Schema = mongoose.Schema
var SucKhoe_HS = new Schema({
    LoaiSucKhoe:String,
    LichSuBenh:String,
    DuocPhamSuDung:String,
    TinhTrangDiUng:String,
    HocSinhID:{type:String,require:true}
})
module.exports = mongoose.model('SucKhoe_HS', SucKhoe_HS)