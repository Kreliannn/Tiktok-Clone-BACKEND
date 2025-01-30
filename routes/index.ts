import { Router } from "express";
import authRoute from "./account"


let route = Router()

route.use(authRoute)

export default route