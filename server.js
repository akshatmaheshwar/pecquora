import express from "express";
import mongoose, { mongo } from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import expressSession from "express-session";
import MongoStore from "connect-mongodb-session";

dotenv.config();

const app = express();

//================middleware==========

//cors

app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
)

//database to store session

const mongoStore = MongoStore(expressSession);
const mongoURI = process.env.mongoURI;
const store = new mongoStore({
    collection:"usersessions",
    uri:mongoURI,
    expires: 7 * 60 * 60 * 24 * 1000,
})


// expires above indicates date of expiration of the session. 
// Here it expires after 7 days
// mongoURI - links application and mongo atlas(DataBase)

// express code to store seesion to database automatically when 
// session is made.

app.use(expressSession({
    name:'_sid',
    secret:process.env.session_secret,
    resave:false,
    saveUninitialized:false,
    store:store,
    cookie:{
        httpOnly:true,
        secure:process.env.NODE_ENV==="production",
        maxAge:7 * 60 * 60 * 24 * 1000,
        sameSite:false,
    }
}))

// secret is password that only me and my server will know.
// its important to store it in dotenv(best practises).
// store:store( const store) connnects mongodb to express server.
// secure:process.env.NODE_ENV==="production" - this will return true or false


//=========================================MongoDb config for application==================================
const mongoDB_connectionOptions ={
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}

mongoose.connect(mongoURI, mongoDB_connectionOptions, (error) => {
    if(error) {
        return console.error(error);
    }

    console.log("mongoDB working succesfully");
});

//==========================================Express cofig======================================================
const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`server started at PORT ${PORT}`);
})
   