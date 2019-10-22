const LocalStrategy = require('passport-local').Strategy
const passport = require('passport');
const User = require('./models/login.models');

// function initialize(passport, getUserByUsername, getUserById) {
//   const autenticateUser = async (User, password, done) => {
//     const user = getUserByUsername(User.username)
//     if(user == null) {
//       return (done(null, false, { meassage: ' Wrong username'}))
//     }

//     try {
//       if( await bcrypt.compare(password, user.password)){
//         return done(null, user)
//       }else{
//         return done(null, false, { message: 'Wrong password'})
//       }
//     } catch(e){
//       return done(e)
//     }
//   }

//   passport.use(new LocalStrategy({ usernameField: 'username' }, autenticateUser))
//   passport.serializeUser((user, done) => done(null, user.id))
//   passport.deserializeUser((id, done) => { 
//     return done(null, getUserById(id))
//    })
// }


const passport2 = () => {
  passport.use(new LocalStrategy(
    function (username, password, done) {
      console.log(username),
      User.getUserByUsername(username, function (err, user) {
        if (err) throw err;
        if (!user) {
          return done(null, false, { message: 'Unknown User' });
        }
      User.comparePassword(password, user.password, function (err, isMatch) {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Invalid password' });
          }
        });
      });
    }
  ));
}



module.exports = passport2;