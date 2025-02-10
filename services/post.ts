import { postType, postInterface, postInterface2 } from "../interface/post"
import Post from "../models/post"
import { Types } from "mongoose"
import { addNotication } from "./notification"
import { notifType } from "../interface/notification"


export const getPosts = async (type = "all", id = "") => {
    switch(type)
    {
        case "all":
            return await Post.find().populate("user").populate({ path : "comment", populate : { path : "sender", model : "user"}})
        break;

        case "profile":
            return await Post.find({ user : id}).populate("user").populate({ path : "comment", populate : { path : "sender", model : "user"}})
        break;
    }
    
}
    

export const getPostById = async (id: string): Promise<postInterface> => await Post.findById(id) as postInterface

export const getPostByUserId = async (id: Types.ObjectId): Promise<postInterface[]> => await Post.find({ user : id}) as postInterface[]

export const uploadPost = async (post: postInterface2 ): Promise<postType> => {
    return await Post.create(post)
}

export const modifyPost = async ( postId: string, updatedValue : postInterface ) => {
    let post: postInterface = await Post.findById(postId) as postInterface
    post = updatedValue
    post.save()
}

export const pushComment = async (postId: string, userId: Types.ObjectId, comment: string) => {
    const post = await Post.findById(postId) as postInterface
    const newComment = {
        message : comment,
        sender : userId,
        date : Date.now().toString()
    }
    post.comment.push(newComment)
    await post.save()

     const notifData = {
        to : post.user,
        from : userId ,
        post : post._id,
        type : "commented",
        date : Date.now().toString()
    }
    
    await addNotication(notifData as notifType)

    return newComment
}