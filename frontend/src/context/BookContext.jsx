import { createContext, useContext, useEffect, useState } from "react";
import { getAllBooksService, addBookService } from "../Services/BooksServices";

const BookContext = createContext(null);

export const BookProvider = ({ children }) => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    // ✅ Load all books on app start
    useEffect(() => {
        const loadBooks = async () => {
            try {
                const data = await getAllBooksService();
                setBooks(data);
            } catch (err) {
                console.error("Failed to load books:", err);
                setBooks([]);
            } finally {
                setLoading(false);
            }
        };
        loadBooks();
    }, []);

    // ✅ Add a new book
    const addBook = async (formData) => {
        try {
            const newBook = await addBookService(formData);
            setBooks((prev) => [...prev, newBook]); // update state
            return newBook;
        } catch (err) {
            console.error("Failed to add book:", err);
            throw err;
        }
    };

    // ✅ Refresh books manually
    const refreshBooks = async () => {
        try {
            setLoading(true);
            const data = await getAllBooksService();
            setBooks(data);
        } catch (err) {
            console.error("Failed to refresh books:", err);
            setBooks([]);
        } finally {
            setLoading(false);
        }
    };

 

    return (
        <BookContext.Provider
            value={{
                books,
                loading,
                addBook,
                refreshBooks,
            }}
        >
            {children}
        </BookContext.Provider>
    );
};

// ✅ Custom hook to use books context
export const useBooks = () => useContext(BookContext);
