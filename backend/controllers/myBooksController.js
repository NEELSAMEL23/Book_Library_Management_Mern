import MyBook from "../models/MyBooks.js";
import Book from "../models/Books.js";

export const getMyBooks = async (req, res) => {
    try {
        const myBooks = await MyBook.find({ user: req.user.id }).populate("book");

        // Remove entries where book is null
        const filteredBooks = myBooks.filter(item => item.book != null);

        res.status(200).json(filteredBooks);
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
            user: req.user.id,
            book: bookId,
            status: "wishlist",
            rating: null,
        });

        await myBook.save();

        // ✅ Populate book details before returning
        const populatedBook = await myBook.populate("book");

        res.status(201).json(populatedBook);
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

        let myBook = await MyBook.findOneAndUpdate(
            { user: req.user.id, book: bookId },
            { status },
            { new: true }
        ).populate("book"); // ✅ populate so frontend gets full book data

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

        let myBook = await MyBook.findOneAndUpdate(
            { user: req.user.id, book: bookId },
            { rating },
            { new: true }
        ).populate("book"); // ✅ populate again

        if (!myBook) return res.status(404).json({ message: "Book not found in your list" });

        res.status(200).json(myBook);
    } catch (error) {
        res.status(500).json({ message: "Error updating rating", error: error.message });
    }
};

