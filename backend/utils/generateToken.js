import jwt from "jsonwebtoken";

export default function generateToken(res, userId) {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });

    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // true in prod
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });


    return token; // optional, in case you also want to return it
}
