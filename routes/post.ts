import { Router } from "express";
import { postImageUpload , getAllPost, postTextUpload} from "../controllers/post";

const route = Router()

route.get("/post", getAllPost)
route.post("/post/upload/image", postImageUpload)
route.post("/post/upload/text", postTextUpload)


export default route
