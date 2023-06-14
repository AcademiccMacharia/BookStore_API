const express = require('express');

const router = express.Router();
const { Home } = require('../controllers/storeController')

router.get('/', Home);



module.exports = router;