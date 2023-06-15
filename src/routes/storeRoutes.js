const express = require('express');

const router = express.Router();
const { Home, getBookbyID } = require('../controllers/storeController')

router.get('/', Home);
router.get('/books/:BookID', getBookbyID);



module.exports = router;