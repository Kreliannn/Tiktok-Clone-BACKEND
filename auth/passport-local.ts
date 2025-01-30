import passport from "passport";
import passportLocal from "passport-local"; // Use default import
const LocalStrategy = passportLocal.Strategy; // Access the Strategy directly
import { findUser, findUserById } from "../services/account";



passport.use(new LocalStrategy(
    async (username, password, done)  =>
    {
      const foundUser = await findUser({ username : username, password : password })

      if(foundUser)
      {
        done(null, foundUser)
      }
      else
      {
        done(null, false)
      }
    }
  ));


  passport.serializeUser((user: any,  done) => {
    
    done(null, user._id)
  })

  passport.deserializeUser( async (id: string, done) => {
    const foundUser = await findUserById(id)
    done(null, foundUser)
  })