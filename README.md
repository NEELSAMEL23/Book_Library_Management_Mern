<h1 align="center">📚 Book Library Management (MERN)</h1>

<p align="center">
  A full-stack book library management system with user authentication, book management, and personalized reading lists.
  <br><br>
  <a href="https://book-library-management-mern-git-main-neel-samels-projects.vercel.app/">
    <img src="https://img.shields.io/badge/Frontend-Live-blue?style=for-the-badge" alt="Frontend Live Demo">
  </a>
  <a href="https://book-library-management-mern.onrender.com">
    <img src="https://img.shields.io/badge/Backend-API-green?style=for-the-badge" alt="Backend API">
  </a>
</p>

---

## 🚀 Features

### **Frontend**
- 🔐 **User Authentication** — Register, Login, Logout  
- 🖼 **Avatar Upload** on Registration (Cloudinary)  
- 📚 **Books Management** — Add, View all books  
- 💳 **My Books List** — Add, Update reading status, Rate books  
- 📱 **Responsive UI** with Tailwind CSS  
- 🛡 **Protected Routes** with JWT  

### **Backend**
- 🗄 **REST API** with Express.js  
- 🛢 **MongoDB + Mongoose**  
- 🔑 **JWT Authentication + bcrypt**  
- 🖼 **Cloudinary image uploads** (avatars & book covers)  
- 📥 **Excel Export** for reports (ExcelJS)  
- ⚠ **Centralized Error Handling** with middleware  
- 📂 **Multer & express-fileupload** for file handling  
- 👤 User & Book management APIs  

---

## 🛠 Tech Stack

| Frontend | Backend |
| -------- | ------- |
| React ^19.1.0 | Node.js |
| React Router DOM ^7.8.1 | Express.js ^5.1.0 |
| Tailwind CSS ^4.1.11 | MongoDB + Mongoose ^8.17.1 |
| Axios ^1.11.0 | JWT (jsonwebtoken ^9.0.2) |
| Lucide React ^0.536.0 | bcryptjs ^3.0.2 |
| React Icons ^5.5.0 | dotenv ^17.2.1 |
|  | cors ^2.8.5 |
|  | cookie-parser ^1.4.7 |
|  | multer ^2.0.2 |
|  | express-fileupload ^1.5.2 |
|  | cloudinary ^2.7.0 |

---

## 📂 Folder Structure

```text
frontend/
├─ public/
├─ src/
│  ├─ assets/
│  ├─ components/       # Reusable UI components
│  ├─ context/          # React Context for Auth, Books, MyBooks
│  ├─ layouts/          # Layout wrappers
│  ├─ Pages/            # Pages (Auth, Books, MyBooks)
│  ├─ Services/         # API services (Axios, Auth, Books)
│  └─ utils/            # Utility functions (ProtectedRoute)
└─ package.json

backend/
├─ config/              # DB connection
├─ controllers/         # Route controllers
├─ middlewares/         # Auth, Error, Upload middleware
├─ models/              # User, Books, MyBooks
├─ routes/              # API routes
├─ utils/               # JWT token generator
├─ uploads/             # Uploaded files
├─ .env
└─ server.js



## ⚙️ Environment Variables

Create a `.env` file inside the **backend** folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```


## 📦 Installation & Setup

1️⃣ **Clone the repository**

```bash
git clone https://github.com/NEELSAMEL23/Book_Library_Management_Mern.git
cd expense-tracker
```

## 📦 Installation & Setup

1️⃣ **Clone the repository**

```bash
git clone https://github.com/yourusername/expense-tracker.git
cd expense-tracker
```

2️⃣ **Install dependencies**

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

3️⃣ **Run the application**

```bash
# Backend
npm start

# Frontend
npm run dev
```

## 📡 API Endpoints

### Auth

| Method | Endpoint             | Description                              |
| ------ | -------------------- | ---------------------------------------- |
| POST   | `/api/auth/register` | Register a new user (with avatar upload) |
| POST   | `/api/auth/login`    | Login user                               |
| POST   | `/api/auth/logout`   | Logout user                              |
| GET    | `/api/auth/profile`  | Get logged-in user profile (protected)   |

### Books
| Method | Endpoint     | Description                                    |
| ------ | ------------ | ---------------------------------------------- |
| GET    | `/api/books` | Get all books (public)                         |
| POST   | `/api/books` | Add a new book (protected, cover image upload) |

### My Books (User’s personal list)
| Method | Endpoint                       | Description                            |
| ------ | ------------------------------ | -------------------------------------- |
| GET    | `/api/my-books`                | Get logged-in user’s books (protected) |
| POST   | `/api/my-books/:bookId`        | Add a book to user’s list (protected)  |
| PATCH  | `/api/my-books/:bookId/status` | Update book status (protected)         |
| PATCH  | `/api/my-books/:bookId/rating` | Update book rating (protected)         |
