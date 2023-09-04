const express = require('express')
const router = express.Router()
const {renderLopHoc,createLopHoc,getSingleLopHoc,showSchedual} = require('../controllers/LopHocController')
//show /lop-hoc
router.get('/lop-hoc',renderLopHoc)
//create
router.post('/lop-hoc',createLopHoc)
//get single - show all members
router.get('/thong-tin-lop-hoc',getSingleLopHoc)

router.get('/class-schedual',showSchedual)
module.exports = router