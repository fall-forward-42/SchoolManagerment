const LopHoc = require('../models/LopHoc')
const HocSinh = require('../models/HocSinh')
const HocTap_HS = require('../models/HocTap_HS')
const TKB = require('../models/ThoiKhoaBieu')


//add new info
const createLopHoc = async (req, res) => {

    if (req.body.TenLop == "" || req.body.BatDau == "" || req.body.KetThuc == "" || req.body.SoLuong == "" || req.body.GVCN == "") {
        req.flash("error", "Vui lòng không bỏ trống !")
        return res.render('lop-hoc', { messages: req.flash() })
    }
    const newLop = new LopHoc(
        {
            TenLop: req.body.TenLop,
            BatDau: req.body.BatDau,
            KetThuc: req.body.KetThuc,
            SoLuong: req.body.SoLuong,
            GVCN: req.body.GVCN,
        }

    )
    req.flash("success", "Thêm lớp học thành công <3")

    return newLop.save().then((thisNew) => {
        return res.redirect('/lop-hoc')
    }).catch((er) => {
        res.status(404)
    })

}


const getSingleLopHoc = async (req, res, next) => {
    let idLopHoc = req.query.id //get id of class
    //find lv1
    LopHoc.findOne({ _id: idLopHoc })
        .then(lopHocSelected => {
            // enter the class to render dashboard Thong-tin-lop-hoc
            res.locals.classExist = true

            //get members of HocTap_HS schema
            const thanhVienList = []
            //find lv2 - get info of student by id inside HocTap schema
            HocTap_HS.find({ LopHocID: idLopHoc }).populate('HocSinhID').then(items => {
                //output
                items.forEach(item => {
                    thanhVienList.push({
                        _id: item._id,
                        HoTen: item.HocSinhID.HoTen,
                        Avatar: item.HocSinhID.Avatar,
                        GioiTinh: item.HocSinhID.GioiTinh,
                        NgayThangSinh: item.HocSinhID.NgayThangSinh.toLocaleDateString('en-GB'),
                        DiaChi: item.HocSinhID.DiaChi,
                        LopHocID: item.LopHocID,
                        SoBaoDanh: item.SoBaoDanh,
                        DiemTongKet: item.DiemTongKet,
                        SoBuoiNghi: item.SoBuoiNghi,
                        ThanhTich: item.ThanhTich,
                        HanhKiem: item.HanhKiem,
                        LuuBan: item.LuuBan,
                    })
                })
                //output info of class
                const lopHoc = {
                    id: lopHocSelected._id,
                    TenLop: lopHocSelected.TenLop,
                    BatDau: lopHocSelected.BatDau.toLocaleDateString('en-GB'),
                    KetThuc: lopHocSelected.KetThuc.toLocaleDateString('en-GB'),
                    SoLuong: lopHocSelected.SoLuong,
                    GVCN: lopHocSelected.GVCN,

                }
                res.cookie('class', lopHoc) //send to another router
                //next()
                res.render("thong-tin-lop-hoc", { lopHoc, thanhVienList, messages: req.flash() })
                return
            })



        })
        .catch((error) => {
            res.status(500).send('wrong class !', error)
        });
}

const renderLopHoc = async (req, res) => {
    LopHoc.find().then((thisLopHoc) => {
        ///restruct data to send 
        let lopHocAll = thisLopHoc.map((item) => {
            return {
                _id: item._id,
                TenLop: item.TenLop,
                BatDau: item.BatDau.toLocaleDateString('en-GB'),
                KetThuc: item.KetThuc.toLocaleDateString('en-GB'),
                SoLuong: item.SoLuong.toString(),
                GVCN: item.GVCN,
            }
        });
        res.render('lop-hoc', {
            lopHocAll: lopHocAll,
            messages: req.flash()
        })
        return

    }).catch((er) => {
        res.status(404)
    })
}


//get achivement of student
const getAchive = async (req, res) => {
    const userName = req.cookies.userNameCurrent // in cookie after signinn
    const idLop = req.query.id // get id in header
    HocSinh.findOne({ TenDangNhap: userName }).then(profile => {
        let idHS = profile._id
        HocTap_HS.find({ LopHocID: idLop, HocSinhID: idHS }).then(hoctap => {
            res.render('thanhTichHS', hoctap)
            return
        }).catch(err => {
            res.send('not found Thanh Tich ! ', err)
        })
    }).catch(err => {
        res.send('not found student !', err)
    })
}
const showSchedual = async (req, res) => {
    const classInfo = req.cookies['class']
    
    res.locals.classExist = true

    TKB.findOne({ LopHocID: classInfo.id }).then(tkb => {
        clone = {
            Thu2:tkb.Thu2,
            Thu3:tkb.Thu3,
            Thu4:tkb.Thu4,
            Thu5:tkb.Thu5,
            Thu6:tkb.Thu6,
            Thu7:tkb.Thu7,

        }
        console.log(clone);
        return res.render('Class-schedual',{tkb:clone})


    })
}
module.exports = { renderLopHoc, createLopHoc, getSingleLopHoc, getAchive, showSchedual }