import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import booksRoutes from "./routes/booksRoutes.js";
import myBooksRoutes from "./routes/myBooksRoutes.js";


import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";

// Connect DB
connectDB();

const app = express();

// CORS configuration (secured for Vercel frontend)
const allowedOrigins = [
    "http://localhost:5173", // local dev
    "https://book-library-management-mern-89ivukh24-neel-samels-projects.vercel.app" // deployed frontend
];

app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin (like mobile apps or curl)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        } else {
            return callback(new Error("CORS not allowed for this origin"), false);
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));



app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/books", booksRoutes);      // Public routes
app.use("/api/my-books", myBooksRoutes);  // Protected routes


app.get("/", (req, res) => {
    res.send("Book Library API is running...");
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
