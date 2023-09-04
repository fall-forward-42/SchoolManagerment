const express = require('express')
const router = express.Router()
const {addHocSinh,getAllHocSinh,getSingleHS,updateHocSinh,deleteHS,profileForm} = require('../controllers/HocSinhController')



//show profile - /hoc-sinh
router.get('/profile-hs',profileForm)
//add hocsinh
router.post('/profile-hs',addHocSinh)

//update hocsinh
router.post('/profile-hs-update',updateHocSinh)




module.exports = router