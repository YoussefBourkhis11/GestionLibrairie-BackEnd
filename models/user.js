const moogoose = require ('mongoose');
const userShema = new moogoose.Schema({
    frn:{
        type:String,
        require:[true, "please provide First Name"]
    },
    ltn:{
        type:String,
        require:[true, "please provide Last Name"]
    },
    eml:{
        type:String,
        require:[true, "please provide email"]
    },
    pass:{
        type:String,
        require:[true, "please provide password"]
    }
})
const User = moogoose.model('User', userShema);
module.exports = User;