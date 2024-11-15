import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const port = 3001;
const app = express();


app.use(express.urlencoded({ extended: true }));

const db = "mongodb://localhost:27017";

const adminSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const Admin = mongoose.model("Admin", adminSchema);

app.get("/", (req, res) => {
    res.render("signup.ejs");
});

mongoose.connect(db)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Database connection error:", err));

app.post("/register", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.send("All fields are required.");
    }

    try {
        const existingUser = await Admin.findOne({ email });

        if (existingUser) {
            return res.send("User already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new Admin({
            email,
            password: hashedPassword,
        });

        await newUser.save();
        res.send("User registered successfully.");
    } catch (error) {
        console.error("Error registering user:", error);
        res.send("Internal server error.");
    }
});

app.get("/login", (req, res) => {
    res.render("login.ejs");
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.send("Both email and password are required.");
    }

    try {
        const user = await Admin.findOne({ email });

        if (!user) {
            return res.send("User not found.");
        }

        console.log("Stored hashed password:", user.password);

        const isMatch = await bcrypt.compare(password, user.password);

        console.log("Password match result:", isMatch);

        if (!isMatch) {
            return res.send("Invalid credentials.");
        }
        else {
            return res.send("Login successful.");
        }
        

    } catch (error) {
        console.error("Error logging in:", error);
        res.send("Internal server error.");
    }
});


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});