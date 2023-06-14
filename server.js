const express = require('express');
const router = require('./src/routes/storeRoutes')

require('dotenv').config();

const app = express();

app.use(express.json());

app.use('/', router);

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server is listening on ${port}`)
})