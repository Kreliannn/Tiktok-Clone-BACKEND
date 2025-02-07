import { Schema, model, Document, Types } from "mongoose";
import { userType } from "../interface/account";

const User = new Schema<userType>({
    fullname : String,
    username : String,
    password : String,
    profile : String,
    followers : [Types.ObjectId],
    following : [Types.ObjectId]
})

export default model("user", User)