const moogoose = require ('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new moogoose.Schema({
    frn:{
        type:String,
        required:[true, "please provide First Name"]
    },
    ltn:{
        type:String,
        required:[true, "please provide Last Name"]
    },
    eml:{
        type:String,
        required:[true, "please provide email"],
        unique: true,
        lowercase: true
    },
    pass:{
        type:String,
        required:[true, "please provide password"]
    },
    role:{
        type:String,
        enum: ['user', 'admin'],
        default: 'user'
    }
}, {
    timestamps: true // Adds createdAt and updatedAt fields
})

// Virtual Properties
userSchema.virtual('fullName').get(function() {
    return `${this.frn} ${this.ltn}`;
});

// Instance Methods (methods on a single user instance)
userSchema.methods.isAdmin = function() {
    return this.role === 'admin';
}

userSchema.methods.isUser = function() {
    return this.role === 'user';
}

userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.pass);
}

userSchema.methods.changePassword = async function(newPassword) {
    this.pass = newPassword;
    return this.save();
}

userSchema.methods.updateProfile = function(data) {
    if (data.frn) this.frn = data.frn;
    if (data.ltn) this.ltn = data.ltn;
    if (data.eml) this.eml = data.eml;
    return this.save();
}

userSchema.methods.promoteToAdmin = function() {
    this.role = 'admin';
    return this.save();
}

userSchema.methods.demoteToUser = function() {
    this.role = 'user';
    return this.save();
}

userSchema.methods.getPublicInfo = function() {
    return {
        id: this._id,
        frn: this.frn,
        ltn: this.ltn,
        eml: this.eml,
        role: this.role,
        fullName: this.fullName
    };
}

// Static Methods (methods on the User model/collection)
userSchema.statics.findByEmail = function(email) {
    return this.findOne({ eml: email.toLowerCase() });
}

userSchema.statics.findAdmins = function() {
    return this.find({ role: 'admin' });
}

userSchema.statics.findUsers = function() {
    return this.find({ role: 'user' });
}

userSchema.statics.getTotalUsers = function() {
    return this.countDocuments();
}

userSchema.statics.getTotalAdmins = function() {
    return this.countDocuments({ role: 'admin' });
}

userSchema.statics.getTotalRegularUsers = function() {
    return this.countDocuments({ role: 'user' });
}

userSchema.statics.searchUsers = function(searchTerm) {
    const regex = new RegExp(searchTerm, 'i');
    return this.find({
        $or: [
            { frn: regex },
            { ltn: regex },
            { eml: regex }
        ]
    });
}

// Pre-save hook to hash password before saving
userSchema.pre('save', async function() {
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified('pass')) { 
        return;
    }

    try {
        console.log('Hashing password for user:', this.eml);
        const hashedPassword = await bcrypt.hash(this.pass, 10);
        this.pass = hashedPassword;
        console.log('Password hashed successfully');
    } catch (error) {
        console.error('Error hashing password:', error);
        throw error;
    }
});

const User = moogoose.model('User', userSchema);
module.exports = User;