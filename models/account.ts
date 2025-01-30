import { Schema, model } from "mongoose";


const User = new Schema({
    fullname : String,
    username : String,
    passport : String,
})

export default model("user", User)