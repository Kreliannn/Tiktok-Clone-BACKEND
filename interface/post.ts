import { userType } from "./account"
import { Document, Types } from "mongoose"

export interface postType extends Document{
    user : Types.ObjectId,
    type : string,
    caption : string,
    imgUrl : string,
    vidUrl : string,
    postBody : string,
    like : Types.ObjectId[],
    favorite : Types.ObjectId[],
    comment : commentInterface[],
    date : string
}

export interface postInterface {
    user : Types.ObjectId,
    type : string,
    caption : string,
    imgUrl : string,
    vidUrl : string,
    postBody : string,
    like : Types.ObjectId[],
    favorite : Types.ObjectId[],
    comment : commentInterface[],
    date : string
}

export interface postImageRequest {
    imageUrl : string,
    caption : string
}



export interface commentInterface {
    message : string,
    sender : userType,
    date : string
}