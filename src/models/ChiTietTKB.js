const mongoose = require('mongoose')
const Schema = mongoose.Schema
var ChiTietTKB = new Schema({
    Thu2:[{type:String}],
    Thu3:[{type:String}],
    Thu4:[{type:String}],
    Thu5:[{type:String}],
    Thu6:[{type:String}],
    Thu7:[{type:String}],
    CN:[{type:String}],
    ThoiKhoaBieuID:{type: mongoose.Schema.Types.ObjectId,ref:'ThoiKhoaBieu',require:true}
})
module.exports = mongoose.model('ChiTietTKB',ChiTietTKB )