const mongoose = require('mongoose')
const Schema = mongoose.Schema
var ThoiKhoaBieu = new Schema({
    LopHocID:{type: mongoose.Schema.Types.ObjectId,ref:'LopHoc',require:true},
    Thu2:[String],
    Thu3:[String],
    Thu4:[String],
    Thu5:[String],
    Thu6:[String],
    Thu7:[String],

})
module.exports = mongoose.model('ThoiKhoaBieu',ThoiKhoaBieu )