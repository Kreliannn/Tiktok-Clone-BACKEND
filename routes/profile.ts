import { Router } from "express";
import { getProfileInfo, followUnFollow, userNotification, changeProfilePicture } from "../controllers/profile";

const route = Router()

route.get("/profile/:userId", getProfileInfo)
route.patch("/profile/follow/:id", followUnFollow)
route.get("/notification", userNotification)
route.post("/profile/change", changeProfilePicture)

export default route
