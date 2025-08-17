import express from "express";
import { getAllBooks, addBook } from "../controllers/booksController.js";
import { protect } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.get("/", getAllBooks);
router.post("/", protect, upload.single("coverImage"), addBook);

export default router;
