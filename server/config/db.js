const mongoose = require('mongoose');
const dns = require('dns');

const connectDB = async () => {
    try {
        // Fix Node.js DNS resolution issues with SRV records LOCALLY but avoid breaking production!
        if (process.env.NODE_ENV !== 'production') {
            dns.setServers(['8.8.8.8', '1.1.1.1']);
        }
        
        const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/plant_care_app';
        await mongoose.connect(uri);
        console.log('MongoDB connection SUCCESS');
    } catch (error) {
        console.error('MongoDB connection FAIL:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
