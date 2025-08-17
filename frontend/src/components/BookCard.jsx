const BookCard = ({ book }) => {
    return (
        <div className="bg-white rounded-xl shadow-md p-4 w-60 h-80 flex flex-col justify-between hover:shadow-lg transition-all duration-300">
            <div>
                <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-full h-36 object-cover rounded-md mb-3"
                />
                <h3 className="text-base font-semibold truncate">{book.title}</h3>
                <p className="text-xs text-gray-600 mb-1">by {book.author}</p>

                {book.description && (
                    <p className="text-xs text-gray-500 line-clamp-2 mb-2">
                        {book.description}
                    </p>
                )}
            </div>

            <p
                className={`text-xs font-medium ${book.availability ? "text-green-600" : "text-red-600"
                    }`}
            >
                {book.availability ? "Available" : "Not Available"}
            </p>
        </div>
    );
};

export default BookCard;
