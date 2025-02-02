import { Request, Response } from "express";
import { userType } from "../interface/account";

export const postImageUpload = (request: Request, response: Response) => {
    const user = request.user as userType

    const { imageUrl, caption } = request.body
    
    
    
}