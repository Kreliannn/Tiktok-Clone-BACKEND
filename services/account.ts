import User from "../models/account"
import { Types } from "mongoose"
import { addUserType, userType } from "../interface/account"


export const addUser = async (user: addUserType) => {
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