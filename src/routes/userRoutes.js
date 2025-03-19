const express = require("express");
const { getUserBooks } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/:userId/books", authMiddleware, getUserBooks);

module.exports = router;
