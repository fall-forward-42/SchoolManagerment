
const user = require('./UserRouter')
const register = require('./Register')
const dashboardHome = require('./dashboard-home')
const { requireAuth, checkUser } = require('../middleware/authMiddleware')
const hocSinh = require('./HocSinhRouter')
const lopHoc = require('./LopHocRouter')
function route(app) {

    //check user
    app.get('*', checkUser) //apply on route after the slash("/")



    //logout
    app.get('/logout', function (req, res) {
        res.cookie('jwt', '', { expiresIn: 1 })
        res.cookie('typeOfAccount', '')
        req.flash('success', 'Đăng xuất thành công !')
        res.redirect('/')
    })
    //login
    app.use('/login', user)
    //register
    app.use('/register', register)
    //app.use('/dashboard-home', requireAuth, dashboardHome)

    //home - without login
    app.get('/', (req, res) => {
        res.render('home', { messages: req.flash() })
    })
    //home in login
    //hoc-sinh
    app.use('/', requireAuth, hocSinh)
    //lop-hoc
    app.use('/', requireAuth, lopHoc)

   

}
module.exports = route