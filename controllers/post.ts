import { Request, Response } from "express";
import { userType, userInterface } from "../interface/account";
import { postType, postInterface } from "../interface/post";
import { uploadPost, getPosts, getPostById, modifyPost, pushComment} from "../services/post";
import { Types } from "mongoose";
import { commentInterface } from "../interface/post";
import { addNotication } from "../services/notification";
import { notifType } from "../interface/notification";


export const getAllPost = async (request: Request, response: Response) => {
    const allPost = await getPosts()
    response.send(allPost)
}


export const getAllProfilePost = async (request: Request<{id : string}>, response: Response) => {
   
    const { id } = request.params

    const allPost = await getPosts("profile", id)
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

    const post = await getPostById(postId) as postInterface
    
    if(post.like.includes(user._id))
    {
        post.like = post.like.filter((item) => item.toString() != user._id.toString())
        console.log("unlike")
    } 
    else
    {
        post.like.push(user._id)
        console.log("like")
    } 
        
    modifyPost(postId, post)

    const notifData = {
        to : post.user,
        from : user._id ,
        post : post._id,
        type : "liked",
        date : Date.now().toString()
    }

    await addNotication(notifData as notifType)

    response.send(post.like.includes(user._id))
}


export const favoritePost = async (request: Request<{}, {}, {postId : string}>, response: Response) => {
    if(!request.user) {
        response.status(500).send("not authenticated")
        return
    } 

    const user = request.user as userInterface

    const { postId } = request.body

    const post = await getPostById(postId)

    if(post.favorite.includes(user._id))
    {
        post.favorite = post.favorite.filter((item) => item.toString() != user._id.toString())
        console.log("unfavorite")
    } 
    else
    {
        post.favorite.push(user._id)
        console.log("favorite")
    } 

    modifyPost(postId, post)

    const notifData = {
        to : post.user,
        from : user._id ,
        post : post._id,
        type : "addToFavorite",
        date : Date.now().toString()
    }

    await addNotication(notifData as notifType)

    response.send(post.favorite.includes(user._id))

}


export const addComment = async (request: Request<{},{},{ postId : string, comment : string}>, response: Response) => {
    
    if(!request.user) {
        response.status(500).send("not authenticated")
        return
    } 

    const user = request.user as userInterface

    const { comment, postId } = request.body

    if(!comment){
        response.status(500).send("empty field")
        return
    }

    const newComment = await pushComment(postId, user._id, comment)

    

    response.send(newComment) 

}