// src/context/GlobalProvider.jsx
import { AuthProvider } from "./AuthContext";
import { BookProvider } from "./BookContext";
import { MyBooksProvider } from "./MyBookContext";


export default function GlobalProvider({ children }) {
    return (
        <AuthProvider>
            <BookProvider>
                <MyBooksProvider>
                    {children}
                </MyBooksProvider>

            </BookProvider>

        </AuthProvider>
    );
}
