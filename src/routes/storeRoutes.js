const express = require('express');
const { authenticateUser } = require('../middlewares/authentication')

const router = express.Router();


const { Home, getAllBooks, getAllMembers, getMemberByID, getBookByID, createMember, createBook, GetBorrowingMember, returnBook, BorrowBook, deleteBook } = require('../controllers/storeController')

router.get('/', Home)
router.get('/members', getAllMembers);
router.get('/members/:MemberID', authenticateUser, getMemberByID);
//router.post('/members', createMember);
router.get('/books', authenticateUser, getAllBooks);
router.get('/books/:BookID', authenticateUser, getBookByID);
router.post('/books', createBook);
router.delete('/books/:BookID', deleteBook);
router.get('/borrowers', GetBorrowingMember);
router.post('/borrow', authenticateUser, BorrowBook);
router.post('/return', authenticateUser, returnBook);




module.exports = router;