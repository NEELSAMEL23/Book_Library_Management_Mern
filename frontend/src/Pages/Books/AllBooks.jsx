import Layout from "../../layouts/Layout";
import { useBooks } from "../../context/BookContext";
import { useMyBooks } from "../../context/MyBookContext";
import BookCard from "../../components/BookCard";
import { useState } from "react";

const AllBooks = () => {
    const { books, loading } = useBooks();
    const { addBookToMyList, myBooks } = useMyBooks();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    if (loading) return <p>Loading books...</p>;

    const handleAddBook = async (bookId) => {
        try {
            setError("");
            setSuccess("");

            await addBookToMyList(bookId);

            setSuccess("✅ Book added successfully!");

            // clear after 2s
            setTimeout(() => {
                setSuccess("");
            }, 2000);

        } catch (err) {
            console.error("Failed to add book:", err);

            let message = "Failed to add book";
            if (err.response?.data?.message) {
                message = err.response.data.message;
            } else if (typeof err.response?.data === "string") {
                message = err.response.data;
            } else if (err.message) {
                message = err.message;
            }

            setError(message);

            setTimeout(() => {
                setError("");
            }, 2000);
        }
    };

    return (
        <Layout>
            {/* Messages */}
            {success && (
                <div className="bg-green-100 text-green-700 p-2 mb-4 rounded-md text-center text-sm">
                    {success}
                </div>
            )}
            {error && (
                <div className="bg-red-100 text-red-700 p-2 mb-4 rounded-md text-center text-sm">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {books.map((book) => {
                    const alreadyAdded = myBooks.some((b) => b.book._id === book._id);

                    return (
                        <div key={book._id} className="flex flex-col items-center space-y-2">
                            <BookCard book={book} />

                            <button
                                onClick={() => handleAddBook(book._id)}
                                disabled={alreadyAdded}
                                className={`w-full text-xs py-1.5 rounded-lg font-medium transition-colors ${alreadyAdded
                                    ? "bg-gray-400 cursor-not-allowed text-white"
                                    : "bg-indigo-600 hover:bg-indigo-700 text-white"
                                    }`}
                            >
                                {alreadyAdded ? "Added" : "Add to My Books"}
                            </button>
                        </div>
                    );
                })}
            </div>
        </Layout>
    );
};

export default AllBooks;
