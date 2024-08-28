const mongoose = require("mongoose");

// Connect to MongoDB Atlas
mongoose.connect("mongodb+srv://test:test@cluster0.9ywx7.mongodb.net/myDatabase");

// Define the User model
const User = mongoose.model('users', { 
    name: String, 
    email: String, 
    password: String 
});

// Create a new user instance
const user = new User({ 
    name: 'Himanshu', 
    email: 'himsnshu@gmail.com', 
    password: '123456' 
});

// Save the user to the database
user.save()
    .then(() => console.log('User saved!'))
    .catch(err => console.error(err));
