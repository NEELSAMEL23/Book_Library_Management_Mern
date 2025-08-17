import mongoose from "mongoose";

const myBookSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // reference to User model
            required: true,
        },
        book: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book", // reference to Book model
            required: true,
        },
        status: {
            type: String,
            enum: ["wishlist", "reading", "completed"], // allowed values
            default: "wishlist",
        },
        rating: {
            type: Number,
            min: 1,
            max: 5,
        },
    },
    { timestamps: true }
);

const MyBook = mongoose.model("MyBook", myBookSchema);

export default MyBook;
