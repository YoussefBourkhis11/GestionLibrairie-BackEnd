const moogoose = require ('mongoose');
const bookSchema = new moogoose.Schema ({
    auteur:{
        type:String,
        require:[true,"please provide auteur"]
    },
    titre:{
        type:String,
        require:[true,"please provide titre"]
    },
    prix:{
        type:Number,
        require:[true,"please provide annee"]
    },
    stock:{
        type:Number,
        require:[true,"please provide stock"]
    }
})
const Book = moogoose.model('Book',bookSchema);
module.exports = Book;