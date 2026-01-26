const Book = require('../models/book');

//create book
const createBook = async (req,res) =>{
    try{
        const book = new Book({
            auteur: req.body.auteur,
            titre: req.body.titre,
            prix: req.body.prix,
            stock: req.body.stock
        });
        await book.save();
        res.status(201).json(book);
    }
    catch(error) {
        res.status(400).json({message: error.message});
    }
};

//get all books
const getAllBooks = async (req,res) => {
    try{
        const book = await Book.find();
        res.status(200).json(book);
    }
    catch(error) {
        res.status(400).json({message: error.message});
    }
};

//update book
const updateBook = async (req,res) =>{
    try{
        const book = await Book.findByIdAndUpdate(req.params.id,req.body, {new: true});
        res.status(200).json(book);
    }
    catch(error) {
        res.status(400).json({message: error.message});
    }
};

//delete book
const deleteBook = async (req,res) =>{
    try{
        const book = await Book.findByIdAndDelete(req.params.id);
        res.status(200).json(book);
    }
    catch(error) {
        res.status(400).json({message: error.message});
    }
};

module.exports = {
    createBook,
    getAllBooks,
    updateBook,
    deleteBook
}