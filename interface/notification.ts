import { Types } from "mongoose"

export interface notifType {
    post : Types.ObjectId,
    to : Types.ObjectId,
    from : Types.ObjectId,
    type : string,
    date : string
}
