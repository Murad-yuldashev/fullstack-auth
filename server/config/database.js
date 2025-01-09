const mongoose = require('mongoose');

const connect = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Database connected successfully');
    } catch (err) {
        console.error('Database connection error:', err);
    }
};

module.exports = connect;
