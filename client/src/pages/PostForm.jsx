import React, { useState, useContext, useEffect } from "react";
import { PostContext } from "../context/PostContext";
import { AuthContext } from "../context/AuthContext";
import { CategoryContext } from "../context/CategoryContext";

const PostForm = () => {
  const { createPost, loading, error } = useContext(PostContext);
  const { user } = useContext(AuthContext);
  const { categories, fetchCategories } = useContext(CategoryContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [featuredImage, setFeaturedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFeaturedImage(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);
    if (featuredImage) {
      formData.append("featuredImage", featuredImage);
    }
    
    // Debug: Check authentication
    console.log('User:', user);
    console.log('Token:', localStorage.getItem('token'));
    console.log('Category:', category);
    
    try {
      await createPost(formData);
      setTitle("");
      setContent("");
      setCategory("");
      setFeaturedImage(null);
      setImagePreview(null);
      alert("Post created!");
    } catch (err) {
      console.error('Create post error:', err);
      console.error('Error response:', err.response?.data);
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <h2>Create/Edit Post</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <label>Title:</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} required maxLength={100} />
      </div>
      <div>
        <label>Content:</label>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
      </div>
      <div>
        <label>Category:</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)} required>
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>{cat.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Featured Image:</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {imagePreview && (
          <div>
            <img src={imagePreview} alt="Preview" style={{ maxWidth: 200, marginTop: 10 }} />
          </div>
        )}
      </div>
      <button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Save Post"}
      </button>
    </form>
  );
};

export default PostForm; 