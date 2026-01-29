const express = require('express');
const { createBook, getAllBooks, deleteBook, updateBook } = require('../controllers/bookController');
const authenticate = require('../middleware/auth');
const router = express.Router();


router.get('/all', getAllBooks);
router.post('/', authenticate, createBook);
router.delete('/:id', authenticate, deleteBook);
router.put('/:id', authenticate, updateBook);

module.exports = router;