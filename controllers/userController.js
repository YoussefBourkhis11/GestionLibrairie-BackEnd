const userModel = require ('../models/user');
const bcrypt = require('bcrypt');
const jwt = require ('jsonwebtoken');

const signUpUser = async (req,res) =>{
    try{
        const{frn,ltn,eml,pass} = req.body;

        const existingUser = await userModel.findOne({eml});
        if(existingUser) {
            return res.status(400).json ({message: 'user already exists'});
        }
        const hashedPassword = await bcrypt.hash(pass, 10);

        const user = new userModel({
            frn,
            ltn,
            eml,
            pass
        })
        await user.save();
        res.status(201).json(user);
    }
    catch (error) {
        res.status(400).json({message: error.message});
    }
};

//login user

const loginUser = async (req,res) => {
    try{
        const {eml,pass} = req.body;
        const user = await userModel.findOne({eml});
        if(!user) {
            return res.status(400).json({message: 'user not found'});
        }

        const passwordMatch = await bcrypt.compare(pass, user.pass);
        if(!passwordMatch) {
            return res.status(400).json({message: 'invalide password'});
        }

        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn:'1h'});
        res.status(200).json({token});
    }
    catch (error) {
        res.status(400).json({message: error.message});
    }
};


module.exports = {
    signUpUser,
    loginUser
}