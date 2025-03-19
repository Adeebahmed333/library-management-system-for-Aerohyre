const Book = require("../models/Book");
const User = require("../models/User");

// @desc    Add a new book
// @route   POST /api/books
// @access  Private
exports.addBook = async (req, res) => {
  const { title, author, ISBN, quantity } = req.body;

  try {
    const book = new Book({
      title,
      author,
      ISBN,
      quantity,
    });

    await book.save();
    res.status(201).json(book);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// @desc    Get all books
// @route   GET /api/books
// @access  Public
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// @desc    Get a single book by ID
// @route   GET /api/books/:id
// @access  Public
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ msg: "Book not found" });
    }

    res.json(book);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// @desc    Borrow a book
// @route   POST /api/borrow/:bookId/:userId
// @access  Private
exports.borrowBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId);

    if (!book) {
      return res.status(404).json({ msg: "Book not found" });
    }

    if (book.quantity <= 0) {
      return res.status(400).json({ msg: "No copies available" });
    }

    // Update the book quantity
    book.quantity -= 1;
    await book.save();

    // Add the book to the user's borrowedBooks array
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Check if the book is already borrowed by the user
    if (user.borrowedBooks.includes(req.params.bookId)) {
      return res.status(400).json({ msg: "Book already borrowed by the user" });
    }

    user.borrowedBooks.push(req.params.bookId);
    await user.save();

    res.json({ msg: "Book borrowed successfully", book });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// @desc    Return a book
// @route   POST /api/return/:bookId/:userId
// @access  Private
exports.returnBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId);

    if (!book) {
      return res.status(404).json({ msg: "Book not found" });
    }

    // Update the book quantity
    book.quantity += 1;
    await book.save();

    // Remove the book from the user's borrowedBooks array
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Check if the book is borrowed by the user
    if (!user.borrowedBooks.includes(req.params.bookId)) {
      return res.status(400).json({ msg: "Book not borrowed by the user" });
    }

    user.borrowedBooks = user.borrowedBooks.filter(
      (bookId) => bookId.toString() !== req.params.bookId
    );
    await user.save();

    res.json({ msg: "Book returned successfully", book });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
