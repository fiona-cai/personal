// components/Modal.js
import React, { useEffect, useState } from "react";
import ContentSection from "./ContentSection"; // Import the ContentSection component

const Modal = ({ slug, onClose }) => {
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/getPost?slug=${slug}`);
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error("Failed to fetch post details:", error);
      }
    };

    fetchPost();

    // Add an event listener for closing modal on Escape key press
    const handleEscape = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [slug, onClose]);

  if (!post) return <div>Loading...</div>;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-6 max-w-4xl w-full overflow-y-auto max-h-screen relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          &#10005;
        </button>
        
        {/* Use ContentSection to display the post content */}
        <ContentSection
          title={post.title}
          tagline={post.tagline}
          image={post.image}
          author={post.author}
          date={post.date}
          content={post.content}
        />
      </div>
    </div>
  );
};

export default Modal;
