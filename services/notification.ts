import Notification from "../models/notification";
import { Types } from "mongoose";
import { notifType } from "../interface/notification";

export const addNotication = async (data : notifType) => await Notification.create(data)
