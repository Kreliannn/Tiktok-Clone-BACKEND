import { body } from "express-validator";



export const createAccountValidator = [
    body("fullname")
     .notEmpty().withMessage("fullname is empty"),
    body("username")
     .notEmpty().withMessage("username is empty"),
    body("password")
     .notEmpty().withMessage("username is empty")
     .isLength({ min : 3}).withMessage("password is too short")
]