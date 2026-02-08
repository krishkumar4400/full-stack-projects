import express from 'express';

const app = express();

app.get('/', (req,res) => {
    res.send("Hell oAdmin");
});

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server is runnning on http://localhost:${port}`);
});