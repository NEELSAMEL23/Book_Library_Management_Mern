import AxiosInstance from "./AxiosInstance";
import { API_PATHS } from "./ApiPaths";

// Get all user's books
export const getMyBooksService = async () => {
    try {
        const { data } = await AxiosInstance.get(API_PATHS.MY_BOOKS.GET_ALL);
        return data;
    } catch (error) {
        throw {
            status: error.response?.status || 500,
            message: error.response?.data?.message || "Failed to fetch your books",
        };
    }
};

// Add book to user's list
export const addBookToMyListService = async (bookId) => {
    try {
        const { data } = await AxiosInstance.post(API_PATHS.MY_BOOKS.ADD(bookId), {});
        return data;
    } catch (error) {
        throw {
            status: error.response?.status || 500,
            message: error.response?.data?.message || "Failed to add book to your list",
        };
    }
};

// Update book status
export const updateBookStatusService = async (bookId, status) => {
    try {
        const { data } = await AxiosInstance.patch(API_PATHS.MY_BOOKS.UPDATE_STATUS(bookId), { status });
        return data;
    } catch (error) {
        throw {
            status: error.response?.status || 500,
            message: error.response?.data?.message || "Failed to update book status",
        };
    }
};

// Update book rating
export const updateBookRatingService = async (bookId, rating) => {
    try {
        const { data } = await AxiosInstance.patch(API_PATHS.MY_BOOKS.UPDATE_RATING(bookId), { rating });
        return data;
    } catch (error) {
        throw {
            status: error.response?.status || 500,
            message: error.response?.data?.message || "Failed to update book rating",
        };
    }
};
