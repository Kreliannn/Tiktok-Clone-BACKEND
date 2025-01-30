import { Types } from "mongoose"

export interface addUserType {
    fullname : string,
    username : string,
    password : string
}

export interface userType  {
     _id : Types.ObjectId,
    fullname : string,
    username : string,
    password : string
}

