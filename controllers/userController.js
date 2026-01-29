const userModel = require ('../models/user');
const jwt = require ('jsonwebtoken');

const signUpUser = async (req,res) =>{
    try{
        const{frn,ltn,eml,pass} = req.body;

        const existingUser = await userModel.findByEmail(eml);
        if(existingUser) {
            return res.status(400).json ({message: 'user already exists'});
        }

        const user = new userModel({
            frn,
            ltn,
            eml,
            pass // Password will be hashed by pre-save hook
        })
        await user.save();
        res.status(201).json(user.getPublicInfo());
    }
    catch (error) {
        res.status(400).json({message: error.message});
    }
};

//login user

const loginUser = async (req,res) => {
    try{
        const {eml,pass} = req.body;
        const user = await userModel.findByEmail(eml);
        if(!user) {
            return res.status(400).json({message: 'user not found'});
        }

        const passwordMatch = await user.comparePassword(pass);
        if(!passwordMatch) {
            return res.status(400).json({message: 'invalid password'});
        }

        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn:'1h'});
        res.status(200).json({
            token,
            user: user.getPublicInfo()
        });
    }
    catch (error) {
        res.status(400).json({message: error.message});
    }
};

// Get current user info
const getCurrentUser = async (req, res) => {
    try {
        const user = await userModel.findById(req.user._id).select('-pass');
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

// Get all users (admin only)
const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find().select('-pass');
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

// Update user (admin only)
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { frn, ltn, eml, role } = req.body;
        
        const updateData = {};
        if (frn) updateData.frn = frn;
        if (ltn) updateData.ltn = ltn;
        if (eml) updateData.eml = eml;
        if (role) updateData.role = role;

        const user = await userModel.findByIdAndUpdate(id, updateData, { new: true }).select('-pass');
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

// Delete user (admin only)
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Prevent admin from deleting themselves
        if (req.user._id.toString() === id) {
            return res.status(400).json({message: 'Cannot delete your own account'});
        }

        const user = await userModel.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }
        res.status(200).json({message: 'User deleted successfully'});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};


module.exports = {
    signUpUser,
    loginUser,
    getCurrentUser,
    getAllUsers,
    updateUser,
    deleteUser
}