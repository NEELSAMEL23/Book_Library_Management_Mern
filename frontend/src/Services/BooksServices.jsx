import AxiosInstance from "./AxiosInstance";
import { API_PATHS } from "./ApiPaths";

// Get all books
export const getAllBooksService = async () => {
    try {
        const { data } = await AxiosInstance.get(API_PATHS.BOOKS.GET_ALL);
        return data;
    } catch (error) {
        throw {
            status: error.response?.status || 500,
            message: error.response?.data?.message || "Failed to fetch books",
        };
    }
};

// Add a new book
export const addBookService = async (formData) => {
    try {
        const { data } = await AxiosInstance.post(
            API_PATHS.BOOKS.ADD,
            formData,
            {
                headers: { "Content-Type": "multipart/form-data" }, // file upload
            }
        );
        return data;
    } catch (error) {
        throw {
            status: error.response?.status || 500,
            message: error.response?.data?.message || "Failed to add book",
        };
    }
};
