import User from "../models/account"
import { Types } from "mongoose"
import { addUserType, userType , createUserType} from "../interface/account"


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