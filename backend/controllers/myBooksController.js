import MyBook from "../models/MyBooks.js";
import Book from "../models/Books.js";

export const getMyBooks = async (req, res) => {
    try {
        const myBooks = await MyBook.find({ user: req.user.id }).populate("book");
        res.status(200).json(myBooks);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user books", error: error.message });
    }
};

export const addBookToMyList = async (req, res) => {
    try {
        const { bookId } = req.params;

        // Check if book exists
        const book = await Book.findById(bookId);
        if (!book) return res.status(404).json({ message: "Book not found" });

        // Check if already exists in user’s list
        const existing = await MyBook.findOne({ user: req.user.id, book: bookId });
        if (existing) return res.status(400).json({ message: "Book already in your list" });

        const myBook = new MyBook({
            user: req.user.id,      // ✅ matches schema
            book: bookId,           // ✅ matches schema
            status: "wishlist",     // ✅ must match enum
            rating: null,
        });

        await myBook.save();
        res.status(201).json(myBook);
    } catch (error) {
        res.status(500).json({ message: "Error adding book", error: error.message });
    }
};

export const updateBookStatus = async (req, res) => {
    try {
        const { bookId } = req.params;
        const { status } = req.body;

        if (!["wishlist", "reading", "completed"].includes(status)) {
            return res.status(400).json({ message: "Invalid status value" });
        }

        const myBook = await MyBook.findOneAndUpdate(
            { user: req.user.id, book: bookId },
            { status },
            { new: true }
        );

        if (!myBook) return res.status(404).json({ message: "Book not found in your list" });

        res.status(200).json(myBook);
    } catch (error) {
        res.status(500).json({ message: "Error updating status", error: error.message });
    }
};

export const updateBookRating = async (req, res) => {
    try {
        const { bookId } = req.params;
        const { rating } = req.body;

        if (rating < 1 || rating > 5) {
            return res.status(400).json({ message: "Rating must be between 1 and 5" });
        }

        const myBook = await MyBook.findOneAndUpdate(
            { user: req.user.id, book: bookId },
            { rating },
            { new: true }
        );

        if (!myBook) return res.status(404).json({ message: "Book not found in your list" });

        res.status(200).json(myBook);
    } catch (error) {
        res.status(500).json({ message: "Error updating rating", error: error.message });
    }
};
