import dotenv from "dotenv";
dotenv.config();
import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import cors from 'cors'
import connectDb from "./config/dbConnection.js";
import userRouter from './routes/user.js'



const app= express()
const port=process.env.PORT
const DATABASE_URL=process.env.DATABASE_URL



app.use(bodyParser.json({ limit:"200mb", extended: true }));
app.use(bodyParser.urlencoded({ limit:"200mb", extended : true , parameterLimit: 50000000}))


////// Database

connectDb(DATABASE_URL)

////// Database


app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods:["GET","POST","DELETE","PUT","PATCH"],
    credentials:true,
}));

app.use(morgan("dev"));
app.use(express.json());




//////routes

app.use('/',userRouter)



app.listen(port,()=>{
    console.log(`Server running at http://localhost:${port}`);
})
