import { Schema, model, Document } from "mongoose";

interface UserInterface extends Document {
    fullname : String,
    username : String,
    password : String,
    profile : string
}

const User = new Schema<UserInterface>({
    fullname : String,
    username : String,
    password : String,
    profile : String
})

export default model("user", User)