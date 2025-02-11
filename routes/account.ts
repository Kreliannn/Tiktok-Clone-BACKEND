import { Router } from "express";
import { createAccount, signIn, getFollowing } from "../controllers/account";
import { createAccountValidator } from "../middleware/validation/accountValidation";
import { body } from "express-validator";
import "../auth/passport-local"
import passport from "passport";


let route = Router()

route.post("/sign_up", createAccountValidator, createAccount )
route.post("/sign_in", passport.authenticate("local"), signIn )
route.get("/account/following", getFollowing)

export default route