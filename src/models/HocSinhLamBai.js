const mongoose = require('mongoose')
const Schema = mongoose.Schema
var HocSinhLamBai = new Schema({
    DiemSo:Number,
    SoLanLam:Number,
    BaiKiemTraID:{type: mongoose.Schema.Types.ObjectId,ref:'BaiKiemTra',require:true},
    HocTap_HS_ID:{type: mongoose.Schema.Types.ObjectId,ref:'HocTap_HS',require:true}
})
module.exports = mongoose.model('HocSinhLamBai',HocSinhLamBai )
