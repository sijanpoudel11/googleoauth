var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20');
var User = require('./model');


passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });


passport.use(
    new GoogleStrategy({

             clientID : '866263286818-i3n1e1ugilndgpd98j3heajenj7rsgp2.apps.googleusercontent.com',
             clientSecret :'8gdawSbKw3WiFA9FIlGpFTRW',
             callbackURL : '/auth/google/redirect'

},(accessToken,refreshToken,profile,done)=>{
console.log(profile);

// search foer user in database
User.findOne({ 'google.googleid'  : profile.id })
.then((user)=>{
    if(user){
        console.log(user);
       console.log('user already exists in database');
       done(null , user);
    }else{

        var newuser = new User();
        newuser.google.username = profile.displayName;
        newuser.google.googleid = profile.id;
        
        newuser.save().then(
            (user)=>{
                console.log('newuser created');
                console.log(user);
                done(null,user);
            }
        ) }
    
})
.catch((error)=>{
    console.log(error);
})

}))
