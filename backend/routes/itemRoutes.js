// const express = require("express");
// const Item = require("../models/Item");
// const authMiddleware = require("../middleware/authMiddleware");

// const router = express.Router();

// router.post("/items", async (req, res) => {
//     try {
//         const item = new Item(req.body);
//         await item.save();
//         res.json(item);
//     } catch (err) {
//         res.status(500).json({ msg: "Error adding item" });
//     }
// });

// router.get("/items", async (req, res) => {
//     const items = await Item.find();
//     res.json(items);
// });

// router.get("/items/:id", async (req, res) => {
//     const item = await Item.findById(req.params.id);
//     res.json(item);
// });

// router.put("/items/:id", async (req, res) => {
//     const item = await Item.findByIdAndUpdate(
//         req.params.id,
//         req.body,
//         { new: true }
//     );
//     res.json(item);
// });

// router.delete("/items/:id", async (req, res) => {
//     await Item.findByIdAndDelete(req.params.id);
//     res.json({ msg: "Item deleted" });
// });

// router.get("/items/search/:name", async (req, res) => {
//     const items = await Item.find({
//         itemName: { $regex: req.params.name, $options: "i" }
//     });
//     res.json(items);
// });

// module.exports = router;

const express = require("express");
const Item = require("../models/Item");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ➕ Add item
router.post("/items", authMiddleware, async (req, res) => {
    try {
        const item = new Item(req.body);
        await item.save();
        res.json(item);
    } catch (err) {
        res.status(500).json({ msg: "Error adding item" });
    }
});

// 📄 Get all items
router.get("/items", authMiddleware, async (req, res) => {
    const items = await Item.find();
    res.json(items);
});

// 🔍 Get item by ID
router.get("/items/:id", authMiddleware, async (req, res) => {
    const item = await Item.findById(req.params.id);
    res.json(item);
});

// ✏️ Update item
router.put("/items/:id", authMiddleware, async (req, res) => {
    const item = await Item.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.json(item);
});

// ❌ Delete item
router.delete("/items/:id", authMiddleware, async (req, res) => {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ msg: "Item deleted" });
});

// 🔍 Search item
router.get("/items/search/:name", authMiddleware, async (req, res) => {
    const items = await Item.find({
        itemName: { $regex: req.params.name, $options: "i" }
    });
    res.json(items);
});

module.exports = router;