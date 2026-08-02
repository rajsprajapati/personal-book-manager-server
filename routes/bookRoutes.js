const express = require("express");
const { 
    createBook, 
    getAllBooks,
} = require("../controllers/bookController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createBook);
router.get("/", protect, getAllBooks);

module.exports = router;