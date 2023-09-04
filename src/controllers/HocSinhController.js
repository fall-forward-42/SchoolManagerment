const HocSinh = require('../models/HocSinh')
const HocTap_HS = require('../models/HocTap_HS')

const { body, validationResult } = require('express-validator')
const userName = ""


//add new info
const addHocSinh = async (req, res) => {
  if (req.body.HoTen == "" || req.body.NgayThangSinh == "" || req.body.DiaChi == "") {
    req.flash("error", "Vui lòng không bỏ trống !")
    return res.render('profile-hs', { messages: req.flash() })
  }
  const userName = req.cookies.userNameCurrent //get username
  const Newprofile = new HocSinh(
    {
      TenDangNhap: userName,
      HoTen: req.body.HoTen,
      GioiTinh: req.body.GioiTinh,
      NgayThangSinh: req.body.NgayThangSinh,
      DiaChi: req.body.DiaChi,
      Avatart: req.body.Avatart,
    }

  )
  return Newprofile
    .save()
    .then((profile) => {
      return res.redirect('/profile-hs')
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: 'Server error. Please try again.',
        error: error.message,
      });
    });

}

const getAllHocSinh = async (req, res) => {

  HocSinh
    .find()
    .then((ListHS) => {
      return res.status(201).json({
        success: true,
        message: 'List of all HS',
        HocSinh: ListHS,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        success: false,
        message: 'Server error. Please try again.',
        error: error.message,
      });
    });
}
const getSingleHS = async (req, res) => {
  const id = req.params.HocSinhID;

  HocSinh.findById(id)
    .then((ThisHS) => {
      return res.status(201).json({
        success: true,
        message: `This is ${ThisHS.HoTen}`,
        HocSinh: ThisHS,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        success: false,
        message: 'This HS does not exist',
        error: error.message,
      });
    });
}
//update info
const updateHocSinh = async (req, res) => {
  if (req.body.HoTen == "" || req.body.NgayThangSinh == "" || req.body.DiaChi == "") {
    req.flash("error", "Vui lòng không bỏ trống !")
     res.render('profile-hs', { messages: req.flash() })
     return res.redirect('/profile-hs')
  }
  const userName = req.cookies.userNameCurrent //get username
  const updateObject = req.body;
  console.log(updateObject)
  HocSinh.updateOne({ TenDangNhap: userName }, { $set: updateObject })
    .exec()
    .then((ThisHS) => {
      req.flash('success', 'Cập nhật thành công')
      return res.redirect('/profile-hs')
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        success: false,
        message: 'Server error. Please try again.'
      });
    });
}
const deleteHS = (req, res) => {
  const id = req.params.HocSinhID;
  HocSinh.findByIdAndRemove(id)
    .exec()
    .then(() => res.status(204).json({
      success: true,
    }))
    .catch((err) => res.status(500).json({
      success: false,
    }));
}

const profileForm = async (req, res) => {
  const userName = req.cookies.userNameCurrent //get username

  //render profile 
  HocSinh.findOne({ TenDangNhap: userName }).then((profile) => {
    if (profile != null) {
      //return res.send(profile)
      return res.render('profile-hs', {
        profile: {
          HoTen: profile.HoTen,
          NgayThangSinh: profile.NgayThangSinh.toLocaleDateString('en-GB'),
          GioiTinh: profile.GioiTinh,
          DiaChi: profile.DiaChi,
          Avatar: profile.Avatar,
        },
        messages: req.flash()
      })
    } else {
      return res.render('profile-hs', profile)
    }

  })
}

module.exports = { addHocSinh, getAllHocSinh, getSingleHS, updateHocSinh, deleteHS, profileForm }