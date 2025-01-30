import { Schema, model } from "mongoose";


const User = new Schema({
    fullname : String,
    username : String,
    password : String,
})

export default model("user", User)