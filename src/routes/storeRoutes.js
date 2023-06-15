const express = require('express');

const router = express.Router();
const { Home, getAllBooks, getAllMembers, getMemberByID, getBookByID } = require('../controllers/storeController')

router.get('/', Home)
router.get('/books', getAllBooks);
router.get('/members', getAllMembers);
router.get('/members/:MemberID', getMemberByID)
router.get('/books/:BookID', getBookbyID);




module.exports = router;