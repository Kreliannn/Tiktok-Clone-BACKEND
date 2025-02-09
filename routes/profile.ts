import { Router } from "express";
import { getProfileInfo, followUnFollow } from "../controllers/profile";

const route = Router()

route.get("/profile/:userId", getProfileInfo)
route.patch("/profile/follow/:id", followUnFollow)

export default route
