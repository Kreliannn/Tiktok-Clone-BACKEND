
import express from "express"
import cors from "cors"
import session from "express-session"
import passport from "passport"
import mongoose from "mongoose"
import dotenv from "dotenv"; 

dotenv.config()
const app = express()


let mongoDb = process.env.mongodb
const PORT = process.env.PORT || 4000;

//mongoose.connect(mongoDb).then(() => console.log("connected to database"))

app.set('trust proxy', 1); 
app.use(cors({
    origin: "*",
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
        secure : true
    }
}))
app.use(passport.initialize())
app.use(passport.session())

app.get("/",  (request, response)=> {
    response.send("hello world")
})



app.listen(PORT, () => console.log("express server is listening.............." + PORT))
