import React, { useState, useEffect } from 'react';

const PhotoDump = ({ content }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageAspects, setImageAspects] = useState({});
  
  // Check if content is blank
  const isBlank = !content || (typeof content === 'string' && content.trim() === '');
  const imageUrls = isBlank ? [] : content.split('\n').filter(line => line.trim() !== '');

  useEffect(() => {
    // Check image dimensions using browser's native Image constructor
    imageUrls.forEach(url => {
      const img = new window.Image();
      img.onload = () => {
        setImageAspects(prev => ({
          ...prev,
          [url]: img.height > img.width
        }));
      };
      img.onerror = () => {
        // If image fails to load, default to horizontal
        setImageAspects(prev => ({
          ...prev,
          [url]: false
        }));
      };
      img.src = url;
    });
  }, [imageUrls]);

  const handleImageClick = (url) => {
    setSelectedImage(url);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  if (isBlank) {
    return (
      <div className="text-center py-16">
        <p className="text-2xl text-gray-600">I will write this soon 🫡</p>
      </div>
    );
  }

  return (
    <div className="photo-dump mt-16">
      <div className="photo-grid">
        {imageUrls.map((url, index) => (
          <div 
            key={index} 
            className={`photo-item ${imageAspects[url] ? 'vertical' : 'horizontal'} group`}
            onClick={() => handleImageClick(url)}
            style={{ '--animation-order': index }}
          >
            <div className="relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1">
              <img
                src={url}
                alt={`Photo ${index + 1}`}
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-sm font-medium"></span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center cursor-pointer"
          onClick={closeModal}
        >
          <div 
            className="relative max-w-7xl max-h-[90vh] mx-4"
            onClick={e => e.stopPropagation()}
          >
            <img
              src={selectedImage}
              alt="Selected photo"
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            />
            <button 
              className="absolute top-4 right-4 text-white text-4xl hover:text-pink-300 transition-colors bg-black/50 rounded-full w-10 h-10 flex items-center justify-center"
              onClick={closeModal}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoDump; 