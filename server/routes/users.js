const express = require('express');
const router = express.Router();
const { User } = require("../models/User");

const { auth } = require("../middleware/auth");

//=================================
//             User
//=================================

//Client로 유저 정보를 전달해주는 router
//사이에 auth는 미들웨어. 중간에 처리한 후 완료 시 아래 body로 들어온다
router.get("/auth", auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image,
    });
});

router.post("/register", (req, res) => {

    //회원가입할때 필요한 정보들을 client에서 가져오면 
    //DB에 넣어준다

    const user = new User(req.body); //body-parser가 있기때문에 req.body로 가져오기 가능

    user.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    });
});

router.post("/login", (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user)
            return res.json({
                loginSuccess: false,
                message: "Auth failed, email not found"
            });

        //비밀번호가 맞는지 확인
        //comparePassword=>User Model안에 구현되어있다
        //login창에 입력된 비밀번호를 암호화하여 DB에 저장된 암호화된 PW와 일치하는 지 확인
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "Wrong password" });

            //isMatch가 true일 경우 토큰 생성하고 로그인 진행
            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                //쿠키에 토큰 저장
                res.cookie("w_authExp", user.tokenExp);
                res
                    .cookie("w_auth", user.token)
                    .status(200)
                    .json({
                        loginSuccess: true, userId: user._id
                    });
            });
        });
    });
});

router.get("/logout", auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true
        });
    });
});

module.exports = router;
