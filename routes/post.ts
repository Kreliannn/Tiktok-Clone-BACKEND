import { Router } from "express";
import { getAllPost, postUpload, likePost, favoritePost} from "../controllers/post";

const route = Router()

route.get("/post", getAllPost)
route.post("/post/upload", postUpload)
route.post("/post/like", likePost)
route.post("/post/favorite", favoritePost)

export default route
