const express = require('express')
const router = express.Router()
const {secretGet,loginGet,loginPost,isLoggedIn,validLogIn} = require('../controllers/UserController')

router.get('/secret',isLoggedIn,secretGet)



//login
router.get('/',loginGet)
router.post('/',loginPost)

module.exports = router





