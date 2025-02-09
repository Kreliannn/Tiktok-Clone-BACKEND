import { Request, Response } from "express";
import { Types } from "mongoose";
import { findUserById, handleFollow } from "../services/account";
import { getPostByUserId } from "../services/post";
import { userInterface, userType } from "../interface/account";
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

export const followUnFollow = async (request: Request<{ id : Types.ObjectId}>, response: Response) => {

    if(!request.user)
    {
        response.status(500).send("not authorize");
    } 

    const { id } = request.params

    const user = request.user as userType
    const userId = user._id as Types.ObjectId
    const stalkedUserId = id
    const result = await handleFollow(userId, stalkedUserId)
    console.log(result)
    response.send(result)

}