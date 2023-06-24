const express = require('express');
const router = require('./src/routes/storeRoutes')
const memberRoutes = require('./src/routes/memberRoutes')


require('dotenv').config();

const app = express();

app.use(express.json());


app.use('/',router);
app.use('/members', memberRoutes)



const port = process.env.PORT;

app.listen(port, () => { console.log(`Server is listening on ${port}`)
})