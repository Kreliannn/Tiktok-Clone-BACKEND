import { Request, Response } from "express";
import { userType, userInterface } from "../interface/account";
import { postType, postInterface } from "../interface/post";
import { uploadPost, getPosts, getPostById, modifyPost} from "../services/post";
import { Types } from "mongoose";
import { commentInterface } from "../interface/post";



export const getAllPost = async (request: Request, response: Response) => {
    const allPost = await getPosts()
    response.send(allPost)
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
        favorite : [],
        comment : [],
        date : Date.now().toString()
    }

    const newPost = {...template, [property] : value }

    let uploaded = await uploadPost(newPost)
    console.log(uploaded)
    response.send("post uploaded")
}

export const likePost = async (request: Request<{}, {}, { postId : string }>, response: Response) => {
    
    if(!request.user) {
        response.status(500).send("not authenticated")
        return
    } 

    const user = request.user as userInterface

    const { postId } = request.body

    const post = await getPostById(postId)
    
    if(post.like.includes(user._id)) post.like = post.like.filter((item) => item.toString() != user._id.toString())
    else post.like.push(user._id)
        

    // notif here

    modifyPost(postId, post)

    response.send(post.like.includes(user._id))
}