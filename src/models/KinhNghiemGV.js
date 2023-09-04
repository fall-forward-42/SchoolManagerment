const mongoose = require('mongoose')
const Schema = mongoose.Schema
var KinhNghiemGiaoVien = new Schema({
    GiaoVienID:{type:String,require:true},
    TruongHoc:String,
    ViTri:String,
    ThoiGianLamViec:Date,
    ThanhTich:{type:String,default:"Chưa có"},
    
})
module.exports = mongoose.model('KinhNghiemGiaoVien', KinhNghiemGiaoVien)