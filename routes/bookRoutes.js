const express = require("express");
const {
  createBook,
  getAllBooks,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createBook);
router.get("/", protect, getAllBooks);
router.put("/:id", protect, updateBook);
router.delete("/:id", protect, deleteBook);

module.exports = router;