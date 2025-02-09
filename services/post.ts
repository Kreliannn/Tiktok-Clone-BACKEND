import { postType, postInterface } from "../interface/post"
import Post from "../models/post"
import { Types } from "mongoose"

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
    

export const getPostById = async (id: string): Promise<postType> => await Post.findById(id) as postType

export const getPostByUserId = async (id: Types.ObjectId): Promise<postInterface[]> => await Post.find({ user : id}) as postInterface[]

export const uploadPost = async (post: postInterface ): Promise<postType> => {
    return await Post.create(post)
}

export const modifyPost = async ( postId: string, updatedValue : postType ) => {
    let post: postType = await Post.findById(postId) as postType
    post = updatedValue
    post.save()
}

export const pushComment = async (postId: string, userId: Types.ObjectId, comment: string) => {
    const post = await Post.findById(postId) as postType
    const newComment = {
        message : comment,
        sender : userId,
        date : Date.now().toString()
    }
    post.comment.push(newComment)
    await post.save()
    return newComment
}