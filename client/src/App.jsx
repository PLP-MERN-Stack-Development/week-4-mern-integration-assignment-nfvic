import React from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import PostList from "./pages/PostList";
import PostDetail from "./pages/PostDetail";
import PostForm from "./pages/PostForm";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider } from "./context/AuthContext";
import { PostProvider } from "./context/PostContext";
import { CategoryProvider } from "./context/CategoryContext";

const App = () => {
  return (
    <AuthProvider>
      <PostProvider>
        <CategoryProvider>
          <Router>
            <Navbar />
            <div style={{ padding: "2rem" }}>
              <Routes>
                <Route path="/" element={<PostList />} />
                <Route path="/posts/:id" element={<PostDetail />} />
                <Route path="/create" element={<PostForm />} />
                <Route path="/edit/:id" element={<PostForm />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </div>
          </Router>
        </CategoryProvider>
      </PostProvider>
    </AuthProvider>
  );
};

export default App; 