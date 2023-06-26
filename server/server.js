const express = require('express');
const cors = require('cors');
const router = require('./src/routes/storeRoutes')
const memberRoutes = require('./src/routes/memberRoutes')

require('dotenv').config();

const app = express();

app.use(cors());

app.use(express.json());

app.use('/',router);
app.use('/members', memberRoutes);

const port = 6050;

app.listen(port, () => {
    console.log(`Server is listening on ${port}`)
});
