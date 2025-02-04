
import express from "express"
import cors from "cors"
import session from "express-session"
import passport from "passport"
import mongoose from "mongoose"
import dotenv from "dotenv"; 
import route from "./routes/index"


dotenv.config()
const app = express()


let mongoDb = "mongodb://localhost/toktik"
const PORT = process.env.PORT || 4000;

mongoose.connect(mongoDb).then(() => console.log("connected to database"))

app.set('trust proxy', 1); 
app.use(cors({
    origin: "http://localhost:3000",
    credentials : true
}))
app.use(express.json())
app.use(session({
    secret : "secret",
    resave : false,
    saveUninitialized : false,
    cookie: { 
        maxAge: 1000 * 60 * 60 * 24 * 7 ,
        httpOnly: true,
        secure : false
    }
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(route)

app.get("/",  async (request, response)=> {
    response.send("hi, welcome!!")
})



app.listen(PORT, () => console.log("express server is listening.............." + PORT))



