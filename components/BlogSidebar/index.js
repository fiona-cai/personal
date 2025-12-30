import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { ISOToDate } from "../../utils";

const BlogSidebar = ({ isOpen, onClose, currentSlug, posts = [] }) => {
  const router = useRouter();
  const sidebarRef = useRef(null);
  const backdropRef = useRef(null);
  const postsListRef = useRef(null);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Animate sidebar and posts when opening
  useEffect(() => {
    if (isOpen && sidebarRef.current && postsListRef.current) {
      // Trigger sidebar slide-in animation
      const sidebar = sidebarRef.current;
      requestAnimationFrame(() => {
        sidebar.classList.add("sidebar-open");
      });

      // Stagger animation for post items
      const postItems = postsListRef.current.children;
      Array.from(postItems).forEach((item, index) => {
        item.style.opacity = "0";
        item.style.transform = "translateY(20px)";
        setTimeout(() => {
          item.style.transition = "opacity 0.4s ease-out, transform 0.4s ease-out";
          item.style.opacity = "1";
          item.style.transform = "translateY(0)";
        }, 150 + index * 60);
      });
    } else if (!isOpen && sidebarRef.current) {
      sidebarRef.current.classList.remove("sidebar-open");
    }
  }, [isOpen, posts]);

  const handlePostClick = (slug) => {
    router.push(`/blog/${slug}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        ref={backdropRef}
        className="fixed inset-0 bg-black/50 z-40 backdrop-fade-in"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className="fixed top-0 right-0 h-full w-full max-w-md tablet:max-w-lg bg-white shadow-2xl z-50 sidebar-container"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h1 className="text-2xl text-gray-900">All Posts</h1>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close sidebar"
            >
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Posts List */}
          <div className="flex-1 overflow-y-auto p-4">
            <div ref={postsListRef} className="space-y-4">
              {posts.map((post) => {
                const isCurrent = post.slug === currentSlug;
                return (
                  <div
                    key={post.slug}
                    onClick={() => !isCurrent && handlePostClick(post.slug)}
                    className={`relative rounded-xl overflow-hidden cursor-pointer transition-all duration-200 ${
                      isCurrent
                        ? "ring-2 ring-[#abcca3] bg-[#abcca3]/5"
                        : "bg-gray-50 hover:bg-gray-100 hover:shadow-md"
                    }`}
                  >
                    <div className="flex gap-4 p-4">
                      {post.image && (
                        <div className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3
                          className={`text-base font-semibold mb-1 line-clamp-2 ${
                            isCurrent ? "text-[#abcca3]" : "text-gray-900"
                          }`}
                        >
                          {post.title}
                        </h3>
                        {post.preview && (
                          <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                            {post.preview}
                          </p>
                        )}
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">
                            {ISOToDate(post.date)}
                          </span>
                          {post.type === "dump" && (
                            <span className="text-xs px-2 py-0.5 bg-white/90 rounded-full text-[#dea4af] font-medium">
                              📸 Photo Dump
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    {isCurrent && (
                      <div className="absolute top-2 right-2">
                        <span className="text-xs px-2 py-1 bg-[#abcca3] text-white rounded-full font-medium">
                          Current
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .backdrop-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }

        .sidebar-container {
          transform: translateX(100%);
          opacity: 0;
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1),
                      opacity 0.4s ease-out;
        }

        .sidebar-container.sidebar-open {
          transform: translateX(0);
          opacity: 1;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
};

export default BlogSidebar;

