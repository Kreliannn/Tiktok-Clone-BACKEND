import { Router } from "express";
import { getAllPost, postUpload, likePost} from "../controllers/post";

const route = Router()

route.get("/post", getAllPost)
route.post("/post/upload", postUpload)
route.post("/post/like", likePost)

export default route
