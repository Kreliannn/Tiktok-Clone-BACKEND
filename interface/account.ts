import { Types } from "mongoose"

export interface addUserType {
    fullname : string,
    username : string,
    password : string,
    confirmPassword : string,
}

export interface createUserType {
    fullname : string,
    username : string,
    password : string,
    profile : string,
}

export interface userType  {
     _id : Types.ObjectId,
    fullname : string,
    username : string,
    password : string,
    profile : string
}

