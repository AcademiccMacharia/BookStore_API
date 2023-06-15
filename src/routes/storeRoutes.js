const express = require('express');

const router = express.Router();
const { Home, getAllBooks, getAllMembers, getMemberByID, getBookByID, createMember } = require('../controllers/storeController')

router.get('/', Home)
router.get('/members', getAllMembers);
router.get('/members/:MemberID', getMemberByID);
router.post('/members', createMember);
router.get('/books', getAllBooks);
router.get('/books/:BookID', getBookByID);




module.exports = router;