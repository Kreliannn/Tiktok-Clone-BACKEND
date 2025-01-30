import User from "../models/account"

type userObj = {
    fullname : string,
    username : string,
    password : string
}

type findUserObj = {
    username : string,
    password : string
}




export const addUser = async (user: userObj) => {
    let newUser = await User.create(user)
    return newUser
}

export const findUser = (user : findUserObj) => {
    const FoundUser = User.findOne(user)
    if(FoundUser)
        return FoundUser
    else
        return false
}


export const findUserById = (id: string) => {
    const foundUser = User.findById(id)
    if(foundUser) return foundUser
    else return false
}