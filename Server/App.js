const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

app.use(cors());
app.use(express.json()); 

// Mongoose schema and model
const schema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    address: String,
    age: Number
});

const Usermodel = mongoose.model("users", schema);

// Routes

// Get all users
app.get("/", async (req, res) => { 
    try {
        const newdata = await Usermodel.find({});
        res.json({ people: newdata });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create a new user
app.post("/create", async (req, res) => { 
    try {
        const newdata = new Usermodel(req.body);
        await newdata.save();
        res.json({ people: newdata });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a user by ID
app.put("/update/:id", async (req, res) => {
    const { id } = req.params;
    const { name, email, phone, address, age } = req.body; // Include address and age for updating

    try {
        const data = await Usermodel.updateOne({ _id: id }, { name, email, phone, address, age }); // Include address and age in update
        res.json({ people: data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a user by ID
app.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const data = await Usermodel.deleteOne({ _id: id });
        res.json({ people: data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});  

// Connect to MongoDB and start server
mongoose.connect("mongodb://localhost:27017/MERNCRUD", { 
    useNewUrlParser: true,
    useUnifiedTopology: true 
})
.then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(5000, () => {
        console.log("🚀 Server is running on http://localhost:5000");
    });
})
.catch((err) => console.log("❌ Failed to connect to MongoDB:", err));
