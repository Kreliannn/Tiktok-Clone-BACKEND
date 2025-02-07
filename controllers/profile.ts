import { Request, Response } from "express";
import { Types } from "mongoose";
import { findUserById } from "../services/account";
import { getPostByUserId } from "../services/post";
import { userInterface } from "../interface/account";
import { postType, postInterface } from "../interface/post";

export const getProfileInfo = async (request: Request<{ userId : Types.ObjectId}>, response : Response) => {
    
    const { userId } = request.params
    console.log(userId)
    const user = await findUserById(userId) as userInterface

    const post = await getPostByUserId(userId) as postInterface[]
    
    let likesCount = 0
    
    post.forEach((post) => {
        likesCount += post.like.length 
    })

    response.send({
        user : {
            fullname : user.fullname,
            profile : user.profile,
            _id : user._id,
            followers : user.followers,
            following : user.following,
            likesCount : likesCount
        },
        post : post
    })
    

}