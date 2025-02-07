import { Request, Response } from "express";

export const getProfileInfo = async (request: Request<{}, {}, { userId }>, response : Response) => {
    
    const { userId } = request.body
    
}