import { postType, postInterface } from "../interface/post"
import Post from "../models/post"

export const getPosts = async () => await Post.find().populate("user")

export const getPostById = async (id: string): Promise<postType> => await Post.findById(id) as postType

export const uploadPost = async (post: postInterface ): Promise<postType> => {
    return await Post.create(post)
}

export const modifyPost = async ( postId: string, updatedValue : postType ) => {
    let post: postType = await Post.findById(postId) as postType
    post = updatedValue
    post.save()
}