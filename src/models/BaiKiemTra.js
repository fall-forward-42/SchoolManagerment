const mongoose = require('mongoose')
const Schema = mongoose.Schema
var BaiKiemTra = new Schema({
    TenBai:String,
    MonHoc:String,
    BatDau:Date,
    KetThuc:Date,
    ThoiGian:Number,
    GiaoVienID:{type: mongoose.Schema.Types.ObjectId,ref:'GiaoVien',require:true},
    LopHocID:{type: mongoose.Schema.Types.ObjectId,ref:'LopHoc',require:true}
})
module.exports = mongoose.model('BaiKiemTra',BaiKiemTra)