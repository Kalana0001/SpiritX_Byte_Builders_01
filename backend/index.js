const express = require('express');
const mysql = require("mysql2/promise");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
const SECRET_KEY = "your_secret_key";

app.use(express.json());
app.use(cors({ origin: '*' }));
app.use(express.urlencoded({ extended: true }));

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'KAlana#23',
    database: 'byte_builders_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

async function testDbConnection() {
    try {
        const connection = await db.getConnection();
        console.log("Successfully connected to the database.");
        connection.release();
    } catch (error) {
        console.error("Database connection failed:", error.message);
    }
}

testDbConnection();

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Middleware to verify JWT token
function verifyToken(req, res, next) {
    const token = req.headers["authorization"];
    if (!token) {
        return res.status(403).json({ message: "Token required" });
    }
    const tokenWithoutBearer = token.split(" ")[1];
    jwt.verify(tokenWithoutBearer, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Invalid token" });
        }
        req.userId = decoded.userId;
        next();
    });
}

// Endpoint to get user info 
app.get("/users", verifyToken, async (req, res) => {
    try {
        const [rows] = await db.query("SELECT username FROM users WHERE id = ?", [req.userId]);
        if (rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ username: rows[0].username }); 
    } catch (error) {
        console.error("Error fetching user info:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Sign up endpoint
app.post("/signup", async (req, res) => {
    try {
        const { username, email, password, confirmPassword } = req.body;

        if (!username || !email || !password || !confirmPassword) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (username.length < 8) {
            return res.status(400).json({ message: "Username must be at least 8 characters long" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        const [existingUser] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: "Email already registered" });
        }

        const [existingUsername] = await db.query("SELECT * FROM users WHERE username = ?", [username]);
        if (existingUsername.length > 0) {
            return res.status(400).json({ message: "Username already taken" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = "INSERT INTO users (`username`, `email`, `password`) VALUES (?, ?, ?)";
        await db.query(sql, [username, email, hashedPassword]);

        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Login endpoint 
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const [users] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
        if (users.length === 0) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const user = users[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user.id, email: user.email }, SECRET_KEY, { expiresIn: "1h" });
        
        console.log('Generated JWT Token:', token);
        
        res.json({ message: "Success", token });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

const PORT = process.env.PORT || 8087;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
