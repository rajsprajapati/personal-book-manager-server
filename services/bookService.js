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

const getAllBooks = async (userId) => {
  const books = await Book.find({ user: userId, isActive: true })
    .sort({ createdAt: -1 })
    .select("-__v")
    .lean();

  return {
    success: true,
    totalBooks: books.length,
    books,
  };
};

const updateBook = async (bookId, userId, updateData) => {
  const { title, author, status, notes } = updateData;

  const book = await Book.findOne({ _id: bookId, user: userId, isActive: true });

  if (!book) {
    const error = new Error("Book not found.");
    error.statusCode = 404;
    throw error;
  }

  if (title !== undefined) book.title = title;
  if (author !== undefined) book.author = author;
  if (status !== undefined) book.status = status;
  if (notes !== undefined) book.notes = notes;

  await book.save();

  return {
    success: true,
    message: "Book updated successfully.",
    book,
  };
};

const deleteBook = async (bookId, userId) => {
  const book = await Book.findOne({ _id: bookId, user: userId, isActive: true });

  if (!book) {
    const error = new Error("Book not found.");
    error.statusCode = 404;
    throw error;
  }

  book.isActive = false;
  await book.save();

  return {
    success: true,
    message: "Book deleted successfully.",
    book,
  };
};

module.exports = {
  createBook,
  getAllBooks,
  updateBook,
  deleteBook,
};