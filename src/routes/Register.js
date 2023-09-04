const express = require('express')
const router = express.Router()
const {registerGet,registerPost,validForm} = require('../controllers/RegisterController')

//sign up
router.get('/',registerGet)
router.post('/',validForm,registerPost)



module.exports = router