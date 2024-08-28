const mongoose = require("mongoose");
const express = require("express"); // Required for Express
const app = express(); // Initialize Express

app.use(express.json()); // Middleware to parse JSON bodies

// Connect to MongoDB Atlas
mongoose.connect("mongodb+srv://test:test@cluster0.9ywx7.mongodb.net/myDatabase", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const User = mongoose.model('users', { name: String, email: String, password: String });

app.post("/signup", async function(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const name = req.body.name;

    // Find if the user already exists
    const existingUser = await User.findOne({ email: username });
    if (existingUser) {
        return res.status(400).send("Username already Exists");
    }

    // Create and save the new user
    const user = new User({
        name: name,
        email: username,
        password: password
    });

    await user.save();

    // Send success response
    res.json({
        "msg": "User created Successfully"
    });
});

// Start the server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
