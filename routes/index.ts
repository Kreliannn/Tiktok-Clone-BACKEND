import { Router } from "express";
import authRoute from "./account"
import postRoute from "./post"

let route = Router()

route.use(authRoute)
route.use(postRoute)

export default route