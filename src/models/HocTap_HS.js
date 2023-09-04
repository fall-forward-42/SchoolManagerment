const mongoose = require('mongoose')
const Schema = mongoose.Schema
var TTHT = new Schema({
    HocSinhID: {type: mongoose.Schema.Types.ObjectId,ref:'HocSinh',require:true},
    LopHocID:{type:String,require:true},
    SoBaoDanh:String,
    DiemTongKet:Number,
    SoBuoiNghi:Number,
    ThanhTich:String,
    HanhKiem:String,
    LuuBan:String
})
module.exports = mongoose.model('HocTap_HS', TTHT)