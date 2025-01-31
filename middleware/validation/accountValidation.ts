import { body } from "express-validator";


export const createAccountValidator = [
    body("fullname")
     .notEmpty().withMessage("fullname is empty"),
    body("username")
     .notEmpty().withMessage("username is empty"),
    body("password")
     .notEmpty().withMessage("password is empty")
     .isLength({ min : 3}).withMessage("password is too short"),
     body("confirmPassword")
     .notEmpty().withMessage("confirm password is empty")
]