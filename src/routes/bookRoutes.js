const express = require("express");
const {
  addBook,
  getBooks,
  getBookById,
  borrowBook,
  returnBook,
} = require("../controllers/bookController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, addBook);
router.get("/", getBooks);
router.get("/:id", getBookById);
router.post("/borrow/:bookId/:userId", authMiddleware, borrowBook);
router.post("/return/:bookId/:userId", authMiddleware, returnBook);

module.exports = router;
