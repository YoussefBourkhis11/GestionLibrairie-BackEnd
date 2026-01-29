require('dotenv').config();
const connectDB = require('../bd/connect');
const userModel = require('../models/user');

// Script to create or update a user to admin role
// Usage: node scripts/createAdmin.js <email>

async function createAdmin() {
    try {
        const email = process.argv[2];
        
        if (!email) {
            console.error('Please provide an email address');
            console.log('Usage: node scripts/createAdmin.js <email>');
            process.exit(1);
        }

        await connectDB(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const user = await userModel.findOne({ eml: email });
        
        if (!user) {
            console.error(`User with email ${email} not found`);
            process.exit(1);
        }

        user.role = 'admin';
        await user.save();

        console.log(`User ${email} has been set as admin successfully!`);
        process.exit(0);
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
}

createAdmin();
