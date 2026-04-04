import express, { urlencoded } from 'express';

const app = express();

app.use(express.json());
app.use(urlencoded({extended: true}));

app.get('/', (req,res) => {
    res.send("Hello Express"); 
});

const port = process.env.PORT ||4000;

app.listen(port, () => {
    console.log(`Server is Running on http://localhost:${port}`); 
});