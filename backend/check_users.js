const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/jobportal', { useNewUrlParser: true, useUnifiedTopology: true });

// User schema and model
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

// Fetch and log users
async function checkUsers() {
    try {
        const users = await User.find();
        console.log(users);
    } catch (error) {
        console.error('Error fetching users:', error);
    } finally {
        mongoose.connection.close();
    }
}

checkUsers();
