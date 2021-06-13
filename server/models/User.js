const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const moment = require("moment");

const userSchema = mongoose.Schema({
    name: {
        type:String,
        maxlength:50
    },
    email: {
        type:String,
        trim:true, //trim true이면 띄어쓰기를 자동으로 제거한다
        unique: 1 
    },
    password: {
        type: String,
        minglength: 5
    },
    lastname: {
        type:String,
        maxlength: 50
    },
    role : {
        type:Number,
        default: 0 
    },
    image: String,
    token : {
        type: String,
    },
    //token의 유효기간
    tokenExp :{
        type: Number
    }
})

//Save전에 비밀번호 암호화를 위함. 단, 비밀번호 변경/추가가 있을 시에만 동작
userSchema.pre('save', function( next ) {
    var user = this;
    
    if(user.isModified('password')){    
        // console.log('password changed')
        //비밀번호 salt 생성
        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err) return next(err);
    
            //salt를 통해 hash 생성, 암호화 hash값을 user.password에 넣어줌
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err);
                user.password = hash 
                next()
            })
        })
    } else {
        next()
    }
});

userSchema.methods.comparePassword = function(plainPassword,cb){
    //로그인창에서 입력받은 PW를 암호화하여 DB에 저장된암호와 같은지 확인
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if (err) return cb(err);
        cb(null, isMatch) //일치할 경우 isMatch를 내보냄
    })
}

userSchema.methods.generateToken = function(cb) {
    var user = this;

    //토큰 생성
    var token =  jwt.sign(user._id.toHexString(),'secret')
    //토큰 유효기간 생성
    var oneHour = moment().add(1, 'hour').valueOf();

    user.tokenExp = oneHour;
    user.token = token; //생성한 토큰을 넣어준다
    user.save(function (err, user){
        if(err) return cb(err)
        cb(null, user);
    })
}

userSchema.statics.findByToken = function (token, cb) {
    var user = this;

    //토큰을 decode한다
    //토큰 생성시 'secret'을 사용했으므로 'secret'을 넣어준다
    jwt.verify(token,'secret',function(err, decode){
        //decode해서 찾은 user의 _id
        user.findOne({"_id":decode, "token":token}, function(err, user){
            if(err) return cb(err);
            cb(null, user);
        })
    })
}

const User = mongoose.model('User', userSchema);

module.exports = { User }