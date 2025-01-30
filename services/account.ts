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
    console.log(user)
    let newUser = await User.create(user)
    return newUser
}

export const findUser = async (username: string, password: string) => {
    console.log(username, password)
    const FoundUser =  await User.findOne({ username: username, password: password })
    if(FoundUser)
    {
        console.log(FoundUser)
        return FoundUser
    }

    else
    {
        console.log("not found ")
        return false
    }

}


export const findUserById = async (id: any) => {
    const foundUser = await User.findOne({ _id : id})
    if(foundUser) return foundUser
    else return false
}