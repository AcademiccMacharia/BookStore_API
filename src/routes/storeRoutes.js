const express = require('express');

const router = express.Router();
const { Home, getAllBooks, getAllMembers, getMemberByID} = require('../controllers/storeController')

router.get('/', Home)
router.get('/books', getAllBooks);
router.get('/members', getAllMembers);
router.get('/members/:MemberID', getMemberByID)




module.exports = router;