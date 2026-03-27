import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();


// middlewares
app.use(express.json());
app.use(cookieParser());

app.get('/', (req,res) => {
    res.send("Hello express"); 
});

export default app;