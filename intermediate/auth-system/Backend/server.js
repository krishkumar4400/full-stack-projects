import express, { urlencoded } from 'express';
import router from './Routes/router.js';
import { connectDB } from './Config/connectDB.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRouter from './Routes/userRoutes.js';

const app = express();
const port = process.env.PORT || 4000;

await connectDB();

const allowedOrigins = [process.env.FRONTEND_URI];

app.use(express.json());
app.use(urlencoded({extended:true}));
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:5173", // dev
      process.env.FRONTEND_URI, // deployed frontend
    ],
    credentials: true, // agar cookies ya auth headers use ho rahe hain
  })
);


// API Endpoints
app.use('/api/auth', router);

app.use('/api/user', userRouter);

app.get('/', (req,res) => {
    res.send("Hello express");
});



app.listen(port, () => {
    console.log(`Server is running on: http://localhost:${port}`);
});