import { Router } from "express";
import { getProfileInfo } from "../controllers/profile";

const route = Router()

route.get("/profile/:userId", getProfileInfo)


export default route
