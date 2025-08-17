import Book from "../models/Books.js";
import cloudinary from "../utils/cloudinary.js"; // utility wrapper for cloudinary

// GET /api/books – Fetch all books (Public)
export const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: "Error fetching books", error: error.message });
    }
};

// POST /api/books – Add new book (Admin or Authorized)
export const addBook = async (req, res) => {
    try {
        const { title, author, description } = req.body;

        let coverImageUrl = "";
        if (req.file) {
            const uploadResult = await cloudinary.uploader.upload(req.file.path, {
                folder: "books",
            });
            coverImageUrl = uploadResult.secure_url;
        }

        const book = await Book.create({
            title,
            author,
            description,
            coverImage: coverImageUrl,
        });

        res.status(201).json(book);
    } catch (error) {
        res.status(500).json({ message: "Error adding book", error: error.message });
    }
};
