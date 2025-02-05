import { Schema, model, Document, Types } from "mongoose";
import { userType } from "../interface/account";
import { commentInterface } from "../interface/post";
import { postType } from "../interface/post";


const Post = new Schema<postType>({
    user : {
        type : Types.ObjectId,
        ref : "user"
    },
    type: String,
    caption : String,
    imgUrl : String,
    vidUrl : String,
    postBody : String,
    like : [Types.ObjectId],
    favorite : [Types.ObjectId],
    comment : [{} as commentInterface],
    date : String
})

export default model("post", Post)