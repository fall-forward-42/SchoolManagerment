const mongoose = require('mongoose')
const Schema = mongoose.Schema
var NoiDungKT = new Schema({
    CauHoi:String,
    NoiDung:[String],
    DapAn:[String],
    BaiKiemTraID:{type:String,require:true},
})
module.exports = mongoose.model('NoiDungKT',NoiDungKT )

