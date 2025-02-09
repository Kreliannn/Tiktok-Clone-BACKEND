import { Router } from "express";
import { getAllPost, postUpload, getAllProfilePost ,likePost, favoritePost, addComment} from "../controllers/post";

const route = Router()

route.get("/post", getAllPost)
route.get("/post/:id", getAllProfilePost)
route.post("/post/upload", postUpload)
route.post("/post/like", likePost)
route.post("/post/favorite", favoritePost)
route.post("/post/comment", addComment)


export default route
