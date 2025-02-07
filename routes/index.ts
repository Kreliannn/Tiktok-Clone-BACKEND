import { Router } from "express";
import authRoute from "./account"
import postRoute from "./post"
import profileRoute from "./profile"

let route = Router()

route.use(authRoute)
route.use(postRoute)
route.use(profileRoute)

export default route