import passport from "passport";
import passportLocal from "passport-local"; // Use default import
const LocalStrategy = passportLocal.Strategy; // Access the Strategy directly
import { checkIfUserExist, findUserById } from "../services/account";
import { userType } from "../interface/account";
import { Types } from "mongoose";

passport.use(new LocalStrategy( async (username, password, done) => {
  
    const user = await checkIfUserExist(username, password);

    if(!user) done(null, false)
    
    done(null, user)

}))

passport.serializeUser((user , done) => {
    const userData = user as userType
    done(null, userData._id)
})

passport.deserializeUser( async (id: Types.ObjectId, done) => {
    let user = await findUserById(id)
    done(null, user)
})