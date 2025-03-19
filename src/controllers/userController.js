const User = require("../models/User");

// @desc    Get books borrowed by a user
// @route   GET /api/users/:userId/books
// @access  Private
exports.getUserBooks = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate(
      "borrowedBooks"
    );

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json(user.borrowedBooks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
