const express = require("express");
const { createBook } = require("../controllers/bookController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createBook);

module.exports = router;