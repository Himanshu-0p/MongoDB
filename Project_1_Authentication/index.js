const express = require("express");
const jwt = require("jsonwebtoken"); // Changed from 'jwt' to 'jsonwebtoken'
const jwtPassword = "123456789";

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

const ALL_USERS = [
    {
        username: "himanshu@gmail.com",
        password: "123",
        name: "himanshu patil"
    },
    {
        username: "swami@gmail.com",
        password: "abc",
        name: "swami patil"
    },
    {
        username: "krushna@gmail.com",
        password: "pwd",
        name: "krushna patil"
    }
];

function userExist(username, password) {
    return ALL_USERS.some(user => user.username === username && user.password === password);
}

app.post("/signin", function (req, res) {
    const { username, password } = req.body;

    if (!userExist(username, password)) {
        return res.status(403).json({
            msg: "User does not exist in our memory db"
        });
    }

    const token = jwt.sign({ username: username }, jwtPassword);
    return res.json({
        token,
    });
});

app.get("/users", function (req, res) {
    const token = req.headers.authorization;
    try {
        const decoded = jwt.verify(token, jwtPassword);
        const username = decoded.username;

        const otherUsers = ALL_USERS.filter(user => user.username !== username);

        return res.json(otherUsers);
    } catch (err) {
        return res.status(403).json({
            msg: "Invalid token"
        });
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
