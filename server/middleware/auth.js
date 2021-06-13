const { User } = require('../models/User');

let auth = (req, res, next) => {
  let token = req.cookies.w_auth; //클라이언트 쿠키에서 토큰 가져옴

  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user)
      return res.json({
        isAuth: false,
        error: true
      });

    req.token = token; //req.token으로 client에서 사용하기 위함
    req.user = user; //req.user으로 client에서 사용하기 위함
    next();
  });
};

module.exports = { auth };
