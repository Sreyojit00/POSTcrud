import React, { useState } from "react";

const PostCard = ({ post, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(post.title);
  const [newDescription, setNewDescription] = useState(post.description);
  const [newImage, setNewImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(post.image);

  const handleDelete = () => {
    onDelete(post._id);
  };

  const handleUpdate = async () => {
    const updatedData = new FormData();
    updatedData.append("title", newTitle);
    updatedData.append("description", newDescription);
    if (newImage) {
      updatedData.append("image", newImage);
    }

    const updatedPost = await onUpdate(post._id, updatedData);

    if (updatedPost) {
      setPreviewImage(updatedPost.image);
      setNewTitle(updatedPost.title);
      setNewDescription(updatedPost.description);
    }

    setIsEditing(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg shadow-lg p-6 bg-white hover:shadow-xl transition-shadow duration-300">
      {isEditing ? (
        <>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md mb-2 focus:ring-2 focus:ring-blue-500"
            placeholder="Update Title"
          />
          <textarea
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4 focus:ring-2 focus:ring-blue-500"
            placeholder="Update Description"
          ></textarea>
          <div className="mb-4">
            <label htmlFor="newImage" className="block text-lg font-medium text-gray-700 mb-2">
              Update Image (optional)
            </label>
            <input
              type="file"
              id="newImage"
              name="newImage"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleUpdate}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors duration-200"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <h3 className="text-2xl font-bold text-gray-800 mb-2 truncate">
            {newTitle}
          </h3>
          {newDescription && (
            <p className="text-gray-600 mb-4 line-clamp-3">
              {newDescription}
            </p>
          )}
          {previewImage && (
            <img
              src={
                previewImage.startsWith("http")
                  ? previewImage
                  : `http://localhost:5000/${previewImage}`
              }
              alt={newTitle}
              className="w-full h-48 object-cover rounded-md mb-4 shadow-sm"
            />
          )}
          <div className="flex justify-between items-center">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors duration-200"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors duration-200"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PostCard;