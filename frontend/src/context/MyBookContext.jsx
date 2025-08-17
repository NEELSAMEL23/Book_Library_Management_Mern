import { createContext, useContext, useEffect, useState } from "react";
import {
    getMyBooksService,
    addBookToMyListService,
    updateBookStatusService,
    updateBookRatingService,
} from "../Services/MyBookService";
import { useAuth } from "./AuthContext"; // <-- import your auth context

const MyBooksContext = createContext(null);

export const MyBooksProvider = ({ children }) => {
    const [myBooks, setMyBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth(); // ✅ current logged-in user

    // ✅ Load books whenever user changes
    useEffect(() => {
        if (!user) {
            setMyBooks([]); // clear if no user
            setLoading(false);
            return;
        }

        const loadMyBooks = async () => {
            try {
                setLoading(true);
                const data = await getMyBooksService();
                setMyBooks(data);
            } catch (err) {
                console.error("Failed to load user's books:", err);
                setMyBooks([]);
            } finally {
                setLoading(false);
            }
        };

        loadMyBooks();
    }, [user]); // <-- runs again when user changes

    // ✅ Add a book
    const addBookToMyList = async (bookId) => {
        try {
            const newBook = await addBookToMyListService(bookId);
            setMyBooks((prev) => [...prev, newBook]);
            return newBook;
        } catch (err) {
            console.error("Failed to add book:", err);
            throw err;
        }
    };

    // ✅ Update status
    const updateBookStatus = async (bookId, status) => {
        try {
            await updateBookStatusService(bookId, status);
            setMyBooks((prev) =>
                prev.map((item) =>
                    item.book._id === bookId ? { ...item, status } : item
                )
            );
        } catch (err) {
            console.error("Failed to update book status:", err);
            throw err;
        }
    };

    // ✅ Update rating
    const updateBookRating = async (bookId, rating) => {
        try {
            await updateBookRatingService(bookId, rating);
            setMyBooks((prev) =>
                prev.map((item) =>
                    item.book._id === bookId ? { ...item, rating } : item
                )
            );
        } catch (err) {
            console.error("Failed to update book rating:", err);
            throw err;
        }
    };

    // ✅ Manual refresh
    const refreshMyBooks = async () => {
        try {
            setLoading(true);
            const data = await getMyBooksService();
            setMyBooks(data);
        } catch (err) {
            console.error("Failed to refresh user's books:", err);
            setMyBooks([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <MyBooksContext.Provider
            value={{
                myBooks,
                loading,
                addBookToMyList,
                updateBookStatus,
                updateBookRating,
                refreshMyBooks,
            }}
        >
            {children}
        </MyBooksContext.Provider>
    );
};

export const useMyBooks = () => useContext(MyBooksContext);
