const express = require('express');
const { authenticateUser } = require('../middlewares/authenticateUser')
const { authenticateAdmin } = require('../middlewares/authenticateAdmin')

const router = express.Router();


const { Home, getAllBooks, getAllMembers, getMemberByID, getBookByID, createBook, GetBorrowingMember, returnBook, BorrowBook, deleteBook } = require('../controllers/storeController')

router.get('/', Home)
router.get('/members', authenticateAdmin, getAllMembers);
router.get('/members/:MemberID', authenticateAdmin, getMemberByID);
//router.post('/members', createMember);
router.get('/books', authenticateUser, getAllBooks);
router.get('/books/:BookID', authenticateAdmin, getBookByID);
router.post('/books', authenticateAdmin, createBook);
router.delete('/books/:BookID', authenticateAdmin, deleteBook);
router.get('/borrowers', authenticateAdmin, GetBorrowingMember);
router.post('/borrow', authenticateUser, BorrowBook);
router.post('/return', authenticateUser, returnBook);


module.exports = router;