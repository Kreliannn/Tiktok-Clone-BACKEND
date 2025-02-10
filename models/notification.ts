import { Schema, model, Document, Types } from "mongoose";
import { userType } from "../interface/account";
import { notifType } from "../interface/notification";



export interface notifTypeComplete extends Document {
    post : {
        type : Types.ObjectId,
        ref : string
    },
    to : Types.ObjectId,
    from : {
        type : Types.ObjectId,
        ref : string
    },
    type : string,
    date : string
}

const Notification = new Schema<notifTypeComplete>({
    post :{
        type : Types.ObjectId,
        ref : "post"
    },
    to : Types.ObjectId,
    from : {
        type : Types.ObjectId,
        ref : "user "
    },
    type : String,
    date : String
})


export default model("notification", Notification)