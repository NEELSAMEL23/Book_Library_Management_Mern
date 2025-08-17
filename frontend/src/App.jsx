import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import NotFound from "./Pages/NotFound";
import ProtectedRoute from "./utils/ProtectedRoute";


import GlobalProvider from "./context/GlobalProvider";

import AllBooks from "./Pages/Books/AllBooks";
import MyBooksList from "./Pages/MyBooks/MyBooksList";

export default function App() {
  return (
    <BrowserRouter>
      <GlobalProvider>
        <Routes>
          {/* Redirect root to login */}
          <Route path="/" element={<Navigate to="/auth/login" />} />

          {/* Public Routes */}
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />

          {/* Protected User Routes */}
          <Route element={<ProtectedRoute role="user" />}>
            <Route path="/books" element={<AllBooks />} />
            <Route path="/books-list" element={<MyBooksList />} />
          </Route>

          {/* 404 Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </GlobalProvider>
    </BrowserRouter>
  );
}
