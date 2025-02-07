import { Router } from "express";
import { getProfileInfo } from "../controllers/profile";

const route = Router()

route.get("/profile", getProfileInfo)


export default route
