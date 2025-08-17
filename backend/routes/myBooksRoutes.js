import express from "express";
import { 
  getMyBooks, 
  addBookToMyList, 
  updateBookStatus, 
  updateBookRating 
} from "../controllers/myBooksController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Protected - Fetch user's books
router.get("/", protect, getMyBooks);

// Protected - Add book to user's list
router.post("/:bookId", protect, addBookToMyList);

// Protected - Update book status
router.patch("/:bookId/status", protect, updateBookStatus);

// Protected - Update book rating
router.patch("/:bookId/rating", protect, updateBookRating);

export default router;
