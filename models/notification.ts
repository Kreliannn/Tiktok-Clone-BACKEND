import { Schema, model, Document, Types } from "mongoose";
import { userType } from "../interface/account";
import { notifType } from "../interface/notification";


const Notification = new Schema<notifType>({
    post : Types.ObjectId,
    to : Types.ObjectId,
    from : Types.ObjectId,
    type : String,
    date : String
})


export default model("notification", Notification)