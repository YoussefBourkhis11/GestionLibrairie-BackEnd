const express = require('express');
const { createBook, getAllBooks, deleteBook, updateBook } = require('../controllers/bookController');
const router = express.Router();


router.post('/',createBook).get('/all',getAllBooks);
router.delete('/:id',deleteBook);
router.put('/:id',updateBook);

module.exports = router;