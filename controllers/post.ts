import { Request, Response } from "express";
import { userType } from "../interface/account";
import { postType, postInterface } from "../interface/post";
import { uploadPost, getPosts } from "../services/post";
import { Types } from "mongoose";
import { commentInterface } from "../interface/post";



export const getAllPost = async (request: Request, response: Response) => {
    const allPost = await getPosts()
    response.send(allPost)
}

export const postImageUpload = async (request: Request<{}, {}, { caption: string, imageUrl : string}>, response: Response) => {
    
    if(!request.user) {
        response.status(500).send("not authenticated")
        return
    } 
        
    const user = request.user as userType

    const { caption, imageUrl } = request.body
    
    const newPost = {
        user : user._id as Types.ObjectId,
        type : "image",
        caption : caption,
        imgUrl : imageUrl,
        vidUrl : "",
        postBody : "",
        like : [],
        comment : [],
        date : Date.now().toString()
    }

    let uploaded = await uploadPost(newPost)
    console.log(uploaded)
    response.send("post uploaded")
}


export const postTextUpload = async (request: Request<{}, {}, {caption : string, postBody : string}>, response: Response) => {
     
    if(!request.user) {
        response.status(500).send("not authenticated")
        return
    } 

    const user = request.user as userType

    const { caption, postBody } = request.body

    if(!postBody)
    {
        response.status(500).send("text field is empty")
        return
    }

    const newPost = {
        user : user._id as Types.ObjectId,
        type : "text",
        caption : caption,
        imgUrl : "",
        vidUrl : "",
        postBody : postBody,
        like : [],
        comment : [],
        date : Date.now().toString()
    }


}


export const postUpload = async (request: Request<{}, {}, { caption : string, type : string, value : string }>, response: Response) => {

    if(!request.user) {
        response.status(500).send("not authenticated")
        return
    } 

    const user = request.user as userType

    const { caption, type, value } = request.body 

    let property = "";

    if(type == "image") property = "imgUrl"
    if(type == "text") property = "postBody"
    if(type == "video") property = "vidUrl"

    const template = {
        user : user._id as Types.ObjectId,
        type : type,
        caption : caption,
        imgUrl : "",
        vidUrl : "",
        postBody : "",
        like : [],
        comment : [],
        date : Date.now().toString()
    }

    const newPost = {...template, [property] : value }

    let uploaded = await uploadPost(newPost)
    console.log(uploaded)
    response.send("post uploaded")
}