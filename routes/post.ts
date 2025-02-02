import { Router } from "express";
import { postImageUpload , getAllPost} from "../controllers/post";

const route = Router()

route.get("/post", getAllPost)
route.post("/post/upload/image", postImageUpload)


export default route
