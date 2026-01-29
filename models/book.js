const moogoose = require ('mongoose');
const bookSchema = new moogoose.Schema ({
    auteur:{
        type:String,
        required:[true,"please provide auteur"]
    },
    titre:{
        type:String,
        required:[true,"please provide titre"]
    },
    prix:{
        type:Number,
        required:[true,"please provide annee"]
    },
    stock:{
        type:Number,
        required:[true,"please provide stock"]
    }
}, {
    timestamps: true // Adds createdAt and updatedAt fields
})

// Instance Methods (methods on a single book instance)
/*
bookSchema.methods.isInStock = function() {
    return this.stock > 0;
}

bookSchema.methods.decreaseStock = function(quantity = 1) {
    if (this.stock >= quantity) {
        this.stock -= quantity;
        return this.save();
    }
    throw new Error('Insufficient stock');
}

bookSchema.methods.increaseStock = function(quantity = 1) {
    this.stock += quantity;
    return this.save();
}

bookSchema.methods.updatePrice = function(newPrice) {
    if (newPrice <= 0) {
        throw new Error('Price must be greater than 0');
    }
    this.prix = newPrice;
    return this.save();
}

bookSchema.methods.getFullInfo = function() {
    return {
        id: this._id,
        auteur: this.auteur,
        titre: this.titre,
        prix: this.prix,
        stock: this.stock,
    };
}
*/
const Book = moogoose.model('Book',bookSchema);
module.exports = Book;