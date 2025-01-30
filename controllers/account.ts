import { Request, Response } from "express"
import { matchedData, validationResult } from "express-validator"
import { addUser } from "../services/account"

type userObj = {
    fullname : string,
    username : string,
    password : string
}

export const createAccount = async (request: Request, response: Response)  => {

    const error = validationResult(request)

    if(!error.isEmpty()){
        response.status(500).send({ "msg" : error.array()[0]})
        return
    }  

    let data: userObj = matchedData(request)

    const newUser = await addUser(data)

   
    response.send(newUser)
}


