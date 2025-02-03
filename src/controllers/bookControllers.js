const Book = require("../models/Book");

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json({ success: true, data: books });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// Retrieve a books by ID
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book)
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });

    res.status(200).json({ success: true, data: book });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// Create a new book
exports.createBook = async (req, res) => {
  try {
    const { title, author, genre, publishDate, price } = req.body;

    // Checking if all fields are provided
    if (!title || !author || !genre || !publishDate || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newBook = new Book({
      title,
      author,
      genre,
      publishDate,
      price,
    });
    await newBook.save();
    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: newBook,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// Update a book by ID
exports.updateBook = async (req, res) => {
  try {
    const { title, author, genre, publishDate, price } = req.body;

    const updateBook = await Book.findByIdAndUpdate(
      req.params.id,
      {
        title,
        author,
        genre,
        publishDate,
        price,
      },
      { new: true }
    );

    if (!updateBook) return res.status(404).json({ message: "Book not found" });
    res
      .status(200)
      .json({
        success: true,
        message: "Book updated successfully",
        data: updatedBook,
      });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book)
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });

    res
      .status(200)
      .json({ success: true, message: "Book deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
