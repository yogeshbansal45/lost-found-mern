const authMiddleware = require("../middleware/authMiddleware");
const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    itemName: String,
    description: String,
    type: String, // Lost / Found
    location: String,
    date: String,
    contactInfo: String
});

module.exports = mongoose.model("Item", itemSchema);