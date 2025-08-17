export const BASEURL = "https://book-library-management-mern.onrender.com";

export const API_PATHS = {
    AUTH: {
        REGISTER: "/api/auth/register",
        LOGIN: "/api/auth/login",
        LOGOUT: "/api/auth/logout",
        GET_PROFILE: "/api/auth/profile",
    },
    BOOKS: {
        GET_ALL: "/api/books",
        ADD: "/api/books",
    },
    MY_BOOKS: {
        GET_ALL: "/api/my-books",               // GET user's books
        ADD: (bookId) => `/api/my-books/${bookId}`, // POST add book to user's list
        UPDATE_STATUS: (bookId) => `/api/my-books/${bookId}/status`, // PATCH status
        UPDATE_RATING: (bookId) => `/api/my-books/${bookId}/rating`, // PATCH rating
    },
};

