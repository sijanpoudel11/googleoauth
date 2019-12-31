var router = require('express').Router();
var passport = require('passport');
var passportsetup = require('./passport-config');

router.get('/google',passport.authenticate('google',{scope : ['profile']}));

router.get('/google/redirect',passport.authenticate('google',{
    successRedirect :'/auth/profile',
    failureRedirect: '/login'
}))
router.get('/profile',entureauthenticated,(req,res)=>{
    console.log( 'the logged user is  '+req.user.google.username +' with id '+ req.user.google.googleid);
    res.render('profile')
})
router.get('/info',entureauthenticated,(req,res)=>{
    res.render('info',{user:req.user.google});
})
function entureauthenticated(req,res,next) {
    if(!req.isAuthenticated()){
        console.log('user not authenticated');
      return  res.redirect('/login');
    }else{
        console.log('user authenticated');
        return next();
    }
}

module.exports = router