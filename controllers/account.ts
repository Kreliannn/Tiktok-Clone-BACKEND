import { Request, Response } from "express"
import { matchedData, validationResult } from "express-validator"
import { addUser, checkUsernameExist } from "../services/account"
import { addUserType, userType, createUserType } from "../interface/account"


export const createAccount = async (request: Request, response: Response)  => {

    const error = validationResult(request)

    if(!error.isEmpty()){
        response.status(500).send({ "msg" : error.array()[0].msg})
        return
    }  

    let data: addUserType = matchedData(request)    

    if(data.password != data.confirmPassword)
    {
        response.status(500).send({ msg : "password and confirm password not matched"})
        return
    }

    if(await checkUsernameExist(data.username))
    {
        response.status(500).send({ msg : "username already taken"})
        return
    }

    const user = {
        fullname : data.fullname,
        username : data.username,
        password : data.password,
        profile : "https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"
    }

    

    const newUser = await addUser(user)

    console.log(newUser)
    response.send("account created")
}




export const signIn = (request: Request, response: Response) => {

    if(!request.user)
    {
        response.status(500).send("user not found")
        return
    } 
    
    const { fullname, profile, _id } = (request.user as userType) 
   
    response.send({fullname, profile, _id})
}


