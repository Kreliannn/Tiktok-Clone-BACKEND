import { Request, Response } from "express"
import { matchedData, validationResult } from "express-validator"
import { addUser } from "../services/account"
import { addUserType, userType } from "../interface/account"


export const createAccount = async (request: Request, response: Response)  => {

    const error = validationResult(request)

    if(!error.isEmpty()){
        response.status(500).send({ "msg" : error.array()[0]})
        return
    }  

    let data: addUserType = matchedData(request)

    const newUser = await addUser(data)

    response.send(newUser)
}


export const signIn = (request: Request, response: Response) => {

    if(!request.user)
    {
        response.send("user not found")
        return
    } 
    
    console.log("welcome " + (request.user as userType).username)
    response.send(request.user)
}


