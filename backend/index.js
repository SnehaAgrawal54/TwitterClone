import express from 'express'
import dotenv from 'dotenv';
import connectDb from './config/database.js';
import cookieParser from 'cookie-parser';
import userRoute from "./routes/userRoute.js";
import tweetRoute from "./routes/tweetRoute.js";
import cors from "cors";

dotenv.config({ path: ".env" })

connectDb()

const app = express()
const port = process.env.PORT
const corsOptions = {
    origin: "https://twitter-clone-frontend-silk.vercel.app",
    methods: 'GET, PUT, POST, DELETE',
    credentials: true
}

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));


// api
app.use("/api/v1/user", userRoute);
app.use("/api/v1/tweet", tweetRoute);

app.get('/', (req, res) => {res.json('Hello')});

app.listen(port, () => { console.log(`Server listening on port ${port}`); })
