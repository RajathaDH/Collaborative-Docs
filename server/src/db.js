const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;

async function connectDB() {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });

        console.log('Connected to MongoDB');
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB;