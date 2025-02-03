import { Router } from "express";
import { getAllPost, postUpload} from "../controllers/post";

const route = Router()

route.get("/post", getAllPost)
route.post("/post/upload", postUpload)


export default route
