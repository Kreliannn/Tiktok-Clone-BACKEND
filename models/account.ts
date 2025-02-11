import { Schema, model, Document, Types } from "mongoose";
import { userType } from "../interface/account";

const User = new Schema<userType>({
    fullname : String,
    username : String,
    password : String,
    profile : String,
    followers : [{ type : Types.ObjectId, ref : "user"}],
    following : [{ type : Types.ObjectId, ref : "user"}]
})

export default model("user", User)