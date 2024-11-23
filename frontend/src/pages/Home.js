import React, { useState, useEffect } from "react";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const response = await fetch("https://crud-post.onrender.com/api/");
    const data = await response.json();
    setPosts(data);
  };

  const handleDelete = async (postId) => {
    const response = await fetch(`https://crud-post.onrender.com/api/${postId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setPosts(posts.filter((post) => post._id !== postId));
    } else {
      alert("Failed to delete the post.");
    }
  };

  const handleUpdate = async (postId, updatedData) => {
    try {
      const response = await fetch(`https://crud-post.onrender.com/api/${postId}`, {
        method: "PUT",
        body: updatedData,
      });
  
      if (response.ok) {
        const updatedPost = await response.json();
  
        // Update the post in the state
        setPosts((prevPosts) =>
          prevPosts.map((post) => (post._id === postId ? updatedPost : post))
        );
  
        return updatedPost; // Return updated post for preview update
      } else {
        console.error("Failed to update post.");
        return null;
      }
    } catch (error) {
      console.error("Error updating post:", error);
      return null;
    }
  };
  
  return (
    <div>
      <PostForm fetchPosts={fetchPosts} />
      <h1 className="text-4xl text-center mb-5">All Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {posts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
