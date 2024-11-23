import React, { useState } from "react";

const PostForm = ({ fetchPosts }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState(""); // Changed 'content' to 'description'
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData object
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description); // Changed 'content' to 'description'
    if (image) {
      formData.append("image", image);
    }

    // Send POST request to create a post
    const response = await fetch("http://localhost:5000/api/", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      fetchPosts(); // Reload the posts after submission
      setTitle(""); // Reset form
      setDescription(""); // Reset form
      setImage(null); // Reset image
    } else {
      alert("Failed to create post.");
    }
  };

  return (
    <div className="mb-6">
      <h2 className="text-3xl text-center mb-4">Create a New Post</h2>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <div className="mb-4">
          <label htmlFor="title" className="block text-lg mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-lg mb-2">
            Description {/* Changed from Content to Description */}
          </label>
          <textarea
            id="description" 
            name="description" 
            value={description}  
            onChange={(e) => setDescription(e.target.value)} 
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            rows="4"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="block text-lg mb-2">
            Image (optional)
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          Create Post
        </button>
      </form>
    </div>
  );
};

export default PostForm;
