const express = require('express');

const router = express.Router();
const { Home, createBook, GetBorrowingMember } = require('../controllers/storeController')

router.get('/', Home);
router.post('/books', createBook);
router.get('/members', GetBorrowingMember);


module.exports = router;