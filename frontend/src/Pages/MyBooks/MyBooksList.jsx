import Layout from "../../layouts/Layout";
import { useMyBooks } from "../../context/MyBookContext";
import MyBookCard from "../../components/MyBookCard";

const MyBooksList = () => {
    const { myBooks, loading, updateBookRating, updateBookStatus, refreshMyBooks } = useMyBooks(); // get both update functions

    if (loading) return <p>Loading...</p>;

    return (
        <Layout>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0">
                {myBooks
                    .filter((item) => item.book) // make sure book exists
                    .map((item) => (
                        <MyBookCard
                            key={item._id}
                            bookId={item.book._id}       // use Book._id for backend
                            book={item.book}
                            status={item.status}
                            rating={item.rating}
                            updateBookRating={updateBookRating} // rating update
                            updateBookStatus={updateBookStatus} // status update
                        />
                    ))}
            </div>
        </Layout>
    );
};

export default MyBooksList;
