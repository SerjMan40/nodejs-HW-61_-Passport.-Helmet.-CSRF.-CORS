import passport from 'passport'


export const getLoginHendler = (req, res) => {
  const user = req.user || null
  res.render('login.ejs', {user})
}



export const postLoginHandler = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.render('isLogin.ejs', { user: null, login: false }); 
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.render('isLogin.ejs', { user, login: true });
    });
  })(req, res, next);
};