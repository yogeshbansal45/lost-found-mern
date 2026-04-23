const itemRoutes = require("./routes/itemRoutes");
const authRoutes = require("./routes/authRoutes");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", authRoutes);
app.use("/api", itemRoutes);

mongoose.connect("mongodb+srv://yogi_:yogesh321@cluster0.q2lh6kp.mongodb.net/lostfound")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));


app.get("/", (req, res) => {
    res.send("API running");
});

app.listen(5000, () => console.log("Server running on port 5000"));