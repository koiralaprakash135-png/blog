import React from "react";
import { Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Post from "./pages/Post.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} /> {/* ✅ Add this */}
        <Route path="/about" element={<About />} />
        <Route path="*" element={<div className="p-6">404 Not Found</div>} />
      </Routes>
    </div>
  );
}
