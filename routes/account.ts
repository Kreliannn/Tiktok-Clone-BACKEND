import { Router } from "express";
import { createAccount } from "../controllers/account";
import { body } from "express-validator";
import "../auth/passport-local"
import passport from "passport";

let route = Router()

route.post(
    "/sign_up", 
    [
        body("fullname")
         .notEmpty().withMessage("fullname is empty"),
        body("username")
         .notEmpty().withMessage("username is empty"),
        body("password")
         .notEmpty().withMessage("username is empty")
         .isLength({ min : 3}).withMessage("password is too short")
    ],
    createAccount
)


route.post("/sign_in", passport.authenticate("local"), (request, response) => {

    console.log("welcome!!!!!!!!!!!")
    console.log(request.user)
    response.send(request.user)
})

export default route