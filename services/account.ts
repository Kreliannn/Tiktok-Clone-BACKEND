import User from "../models/account"
import { Types } from "mongoose"
import { addUserType, userType , createUserType} from "../interface/account"
import { addNotication } from "./notification"
import { notifType } from "../interface/notification"

export const addUser = async (user: createUserType) => {
    console.log(user)
    let newUser = await User.create(user)
    return newUser
}


export const checkIfUserExist = async (username: string, password: string): Promise<boolean | userType> => {
    let user: userType | null  = await User.findOne({ username, password})
    if(user) return user
    else return false
}

export const findUserById = async (id: Types.ObjectId) => {
    const user = await User.findById(id) 
    if(user) return user
    else return false
}

export const checkUsernameExist = async (username : string): Promise<boolean> => {
    const user = await User.findOne({ username : username})
    if(user) return true;
    else return false
}


export const handleFollow = async (userId : Types.ObjectId, stalkedUserId : Types.ObjectId) => {
    const user = await User.findById(userId) as userType
    const stalkedUser = await User.findById(stalkedUserId) as userType
    if(stalkedUser.followers.includes(userId))
    {
        let removedFollow = stalkedUser.followers.filter((item) => item.toString() != userId.toString())
        let removedFollowing = user.followers.filter((item) => item.toString() != stalkedUserId.toString())

        stalkedUser.followers = removedFollow
        user.following = removedFollowing

        await stalkedUser.save()
        await user.save()

        return "unFollow"
    }
    else
    {
        stalkedUser.followers.push(userId)
        user.following.push(stalkedUserId)
        
        await stalkedUser.save()
        await user.save()

        const notifData = {
            to : stalkedUserId,
            from : userId ,
            post : stalkedUserId,
            type : "follow",
            date : Date.now().toString()
        }
            
        await addNotication(notifData as notifType)

        return "follow"
    }
   
}

export const changeProfile = async (id : Types.ObjectId, url : string) => {
    const user = await User.findById(id) as userType
    user.profile = url
    await user.save()
}

export const getUserFollowing = async (userId : Types.ObjectId) => await User.findById(userId).populate("following").populate("followers")
