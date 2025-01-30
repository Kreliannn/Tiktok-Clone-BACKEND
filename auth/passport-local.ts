import passport from "passport";
import passportLocal from "passport-local"; // Use default import
const LocalStrategy = passportLocal.Strategy; // Access the Strategy directly
import { findUser, findUserById } from "../services/account";

passport.use(new LocalStrategy(
    async (username, password, done)  =>
    {
      console.log("local")

      const foundUser = await findUser(username, password)
      console.log(foundUser)
      if(foundUser)
      {
        console.log("success")
        done(null, foundUser)
      }
      else
      {
        console.log("error")
        done(null, false)
      }
    }
  ));


  passport.serializeUser((user: any,  done) => {
    console.log("serialize")
    done(null, user._id)
  })

  passport.deserializeUser( async (id: any, done) => {
    console.log("deserialize")
    const foundUser = await findUserById(id)
    done(null, foundUser)
  })