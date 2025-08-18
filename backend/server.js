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
const whitelist = [
    "http://localhost:5173",       // local frontend
    "https://your-vercel-domain"   // deployed frontend
];

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || whitelist.indexOf(origin) !== -1) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true
    })
);


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
