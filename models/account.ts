import { Schema, model, Document } from "mongoose";

interface UserInterface extends Document {
    fullname : String,
    username : String,
    password : String,
}

const User = new Schema<UserInterface>({
    fullname : String,
    username : String,
    password : String,
})

export default model("user", User)