require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('../models/Admin');

const createAdmin = async () => {
    const email = process.argv[2] || 'admin@example.com';
    const password = process.argv[3] || 'admin123';
    const name = process.argv[4] || 'Portfolio Admin';

    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB');

        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            console.log('⚠️ Admin already exists with this email.');
            process.exit(0);
        }

        const newAdmin = new Admin({ email, password, name });
        await newAdmin.save();

        console.log(`✅ Admin created successfully!
Email: ${email}
Password: ${password}
Name: ${name}`);
        process.exit(0);
    } catch (err) {
        console.error('❌ Error creating admin:', err.message);
        process.exit(1);
    }
};

createAdmin();
