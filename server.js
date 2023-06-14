const express = require('express');
require('dotenv').config();

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
})

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server is listening on ${port}`)
})