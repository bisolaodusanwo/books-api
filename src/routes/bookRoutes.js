const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookControllers");
const auth = require("../middleware/authMiddleware");

router.get("/", bookController.getAllBooks);
router.get("/:id", bookController.getBookById);

// Protected routes
router.post("/", auth, bookController.createBook);
router.put("/:id", auth, bookController.updateBook);
router.delete("/:id", auth, bookController.deleteBook);

module.exports = router;
