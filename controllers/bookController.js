const bookService = require("../services/bookService");

const createBook = async (req, res) => {
  try {
    const result = await bookService.createBook(req.body, req.user.id);

    return res.status(201).json(result);
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllBooks = async (req, res) => {
  try {
    const result = await bookService.getAllBooks(req.user.id);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createBook,
  getAllBooks,
};