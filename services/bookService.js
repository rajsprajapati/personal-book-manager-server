const Book = require("../models/Book");

const createBook = async (bookData, userId) => {
  const { title, author, status, notes } = bookData;

  if (!title || !author) {
    const error = new Error("Title and author are required.");
    error.statusCode = 400;
    throw error;
  }

  const book = await Book.create({
    title,
    author,
    status,
    notes,
    user: userId,
  });

  return {
    success: true,
    message: "Book added successfully.",
    book,
  };
};

module.exports = {
  createBook,
};