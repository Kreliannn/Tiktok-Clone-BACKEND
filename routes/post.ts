import { Router } from "express";
import { postImageUpload } from "../controllers/post";

const route = Router()

route.post("/post/image", postImageUpload)

export default route
