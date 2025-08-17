import { useState } from "react";

const MyBookCard = ({ bookId, book, status, rating, updateBookRating, updateBookStatus }) => {
    const [loadingRating, setLoadingRating] = useState(false);
    const [loadingStatus, setLoadingStatus] = useState(false);

    // Update rating
    const handleRating = async (newRating) => {
        try {
            setLoadingRating(true);
            await updateBookRating(bookId, newRating);
        } finally {
            setLoadingRating(false);
        }
    };

    // Update status
    const handleStatusChange = async (newStatus) => {
        try {
            setLoadingStatus(true);
            await updateBookStatus(bookId, newStatus);
        } finally {
            setLoadingStatus(false);
        }
    };

    return (
        <div
            className="
                bg-white border-2 border-gray-200 
                rounded-xl shadow-md 
                hover:shadow-xl hover:border-indigo-500 
                transition-all duration-300 
                overflow-hidden w-52
                transform hover:scale-105
            "
        >
            {/* Cover Image */}
            <div className="relative h-40">
                <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Info Section */}
            <div className="p-3 flex flex-col gap-2">
                <h3 className="text-sm font-semibold text-gray-800 truncate">{book.title}</h3>
                <p className="text-xs text-gray-500 truncate">{book.author}</p>

                {/* Status */}
                <div className="flex items-center gap-2">
                    <select
                        value={status}
                        onChange={(e) => handleStatusChange(e.target.value)}
                        disabled={loadingStatus}
                        className="border rounded-md px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    >
                        <option value="wishlist">Wishlist</option>
                        <option value="reading">Reading</option>
                        <option value="completed">Completed</option>
                    </select>
                    {loadingStatus && <span className="text-[10px] text-gray-400">...</span>}
                </div>

                {/* Rating */}
                <div className="flex items-center text-sm">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span
                            key={star}
                            className={`cursor-pointer text-lg transition-colors ${star <= rating ? "text-yellow-400" : "text-gray-300"
                                }`}
                            onClick={() => handleRating(star)}
                        >
                            ★
                        </span>
                    ))}
                    {loadingRating && <span className="ml-1 text-[10px] text-gray-400">...</span>}
                </div>
            </div>
        </div>
    );
};

export default MyBookCard;
