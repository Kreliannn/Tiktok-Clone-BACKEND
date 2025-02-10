import Notification from "../models/notification";
import { Types } from "mongoose";
import { notifType } from "../interface/notification";

export const addNotication = async (data : notifType) => {
    if(data.to.toString() != data.from.toString()) await Notification.create(data)
}


export const getNotification = async (userId : Types.ObjectId) => {
    return Notification.find({ to : userId }).populate("from")
} 