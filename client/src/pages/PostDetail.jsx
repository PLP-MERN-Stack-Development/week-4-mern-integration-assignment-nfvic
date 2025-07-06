import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { PostContext } from "../context/PostContext";
import { AuthContext } from "../context/AuthContext";
import { postService } from "../services/api";

const PostDetail = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comment, setComment] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);
  const [commentError, setCommentError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await postService.getPost(id);
        setPost(data);
      } catch (err) {
        setError(err.message || "Failed to fetch post");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    setCommentLoading(true);
    setCommentError(null);
    try {
      await postService.addComment(id, { user: user?.id, content: comment });
      // Refresh post to show new comment
      const data = await postService.getPost(id);
      setPost(data);
      setComment("");
    } catch (err) {
      setCommentError(err.message || "Failed to add comment");
    } finally {
      setCommentLoading(false);
    }
  };

  if (loading) return <p>Loading post...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!post) return <p>Post not found.</p>;

  return (
    <div>
      <h2>{post.title}</h2>
      {post.featuredImage && (
        <img src={post.featuredImage} alt="" style={{ maxWidth: 400, marginBottom: 16 }} />
      )}
      <p>{post.content}</p>
      <p>
        <strong>Category:</strong> {post.category?.name || "N/A"}
      </p>
      <p>
        <strong>Author:</strong> {post.author?.username || "N/A"}
      </p>
      <hr />
      <h3>Comments</h3>
      {post.comments && post.comments.length > 0 ? (
        <ul>
          {post.comments.map((c, idx) => (
            <li key={c._id || idx}>
              <strong>{c.user?.username || c.user || "Anonymous"}:</strong> {c.content}
              <br />
              <small>{new Date(c.createdAt).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      ) : (
        <p>No comments yet.</p>
      )}
      {user ? (
        <form onSubmit={handleCommentSubmit} style={{ marginTop: 16 }}>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            rows={3}
            style={{ width: "100%" }}
            disabled={commentLoading}
          />
          <button type="submit" disabled={commentLoading || !comment.trim()}>
            {commentLoading ? "Adding..." : "Add Comment"}
          </button>
          {commentError && <p style={{ color: "red" }}>{commentError}</p>}
        </form>
      ) : (
        <p style={{ color: "#888" }}>Login to add a comment.</p>
      )}
    </div>
  );
};

export default PostDetail; 