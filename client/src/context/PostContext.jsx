import React, { createContext, useState } from "react";
import { postService } from "../services/api";

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await postService.getAllPosts();
      setPosts(data.posts || data); // handle both array and {posts: []}
    } catch (err) {
      setError(err.message || "Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (postData) => {
    setLoading(true);
    setError(null);
    try {
      let response;
      if (postData instanceof FormData) {
        response = await postService.createPost(postData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        response = await postService.createPost(postData);
      }
      setPosts((prev) => [response, ...prev]);
      return response;
    } catch (err) {
      setError(err.message || "Failed to create post");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updatePost = async (id, postData) => {
    setLoading(true);
    setError(null);
    try {
      let response;
      if (postData instanceof FormData) {
        response = await postService.updatePost(id, postData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        response = await postService.updatePost(id, postData);
      }
      setPosts((prev) => prev.map((p) => (p._id === id ? response : p)));
      return response;
    } catch (err) {
      setError(err.message || "Failed to update post");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await postService.deletePost(id);
      setPosts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      setError(err.message || "Failed to delete post");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <PostContext.Provider value={{ posts, loading, error, fetchPosts, createPost, updatePost, deletePost }}>
      {children}
    </PostContext.Provider>
  );
}; 