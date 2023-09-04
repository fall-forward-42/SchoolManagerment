const mongoose = require('mongoose')
const Schema = mongoose.Schema
var DanhGiaGiaoVien = new Schema({
    GiaoVienID:{type: mongoose.Schema.Types.ObjectId,ref:'GiaoVien',require:true},
    HocSinhID:{type: mongoose.Schema.Types.ObjectId,ref:'HocSinh',require:true},
    NoiDung:String,
    DiemSo:Number,
    NgayDanhGia:Date,

})
module.exports = mongoose.model('DanhGiaGiaoVien', DanhGiaGiaoVien)