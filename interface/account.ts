import { Types, Document } from "mongoose"


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

export interface userType extends Document {
    fullname : string,
    username : string,
    password : string,
    profile : string,
    followers : Types.ObjectId[],
    following : Types.ObjectId[],
}

export interface userInterface {
    _id : Types.ObjectId,
    fullname : string,
    username : string,
    password : string,
    profile : string,
    followers : Types.ObjectId[],
    following : Types.ObjectId[],
}

