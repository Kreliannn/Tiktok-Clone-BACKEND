import { postType, postInterface } from "../interface/post"
import Post from "../models/post"


export const uploadImagePost = async (post: postInterface ): Promise<postType> => {
    return await Post.create(post)
}