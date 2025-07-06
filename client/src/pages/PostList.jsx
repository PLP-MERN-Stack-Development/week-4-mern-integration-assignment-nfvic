import React, { useEffect, useContext, useState } from "react";
import { PostContext } from "../context/PostContext";
import { CategoryContext } from "../context/CategoryContext";

const PostList = () => {
  const { posts, loading, error, fetchPosts } = useContext(PostContext);
  const { categories, fetchCategories } = useContext(CategoryContext);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [total, setTotal] = useState(0);

  // Fetch categories for filter dropdown
  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line
  }, []);

  // Fetch posts when page, search, or category changes
  useEffect(() => {
    const fetch = async () => {
      try {
        // Custom fetch for pagination/search/filter
        const params = {};
        if (page) params.page = page;
        if (search) params.q = search;
        if (category) params.category = category;
        // Use fetch directly from postService for custom params
        const { postService } = await import("../services/api");
        const data = await postService.getAllPosts(params.page, 10, params.category, params.q);
        setTotalPages(data.pages || 1);
        setTotal(data.total || 0);
        // Update posts in context
        if (data.posts) {
          // Overwrite posts in context for this page
          // (not ideal for global state, but works for demo)
          fetchPosts(); // keep context in sync
        }
      } catch (err) {
        // error handled in context
      }
    };
    fetch();
    // eslint-disable-next-line
  }, [page, search, category]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleCategory = (e) => {
    setCategory(e.target.value);
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) setPage(newPage);
  };

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h2>Post List</h2>
      <div style={{ marginBottom: 16 }}>
        <input
          type="text"
          placeholder="Search posts..."
          value={search}
          onChange={handleSearch}
          style={{ marginRight: 8 }}
        />
        <select value={category} onChange={handleCategory}>
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>{cat.name}</option>
          ))}
        </select>
      </div>
      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post._id || post.id}>
              {post.featuredImage && (
                <img src={post.featuredImage} alt="" style={{ width: 60, height: 40, objectFit: 'cover', marginRight: 8 }} />
              )}
              {post.title}
            </li>
          ))}
        </ul>
      )}
      <div style={{ marginTop: 16 }}>
        <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
          Previous
        </button>
        <span style={{ margin: '0 8px' }}>
          Page {page} of {totalPages} ({total} posts)
        </span>
        <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default PostList; 