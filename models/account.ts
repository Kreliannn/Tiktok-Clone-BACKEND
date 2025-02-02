import { Schema, model, Document } from "mongoose";
import { userType } from "../interface/account";

const User = new Schema<userType>({
    fullname : String,
    username : String,
    password : String,
    profile : String
})

export default model("user", User)