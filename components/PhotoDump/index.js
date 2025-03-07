import React, { useState, useEffect } from 'react';

const PhotoDump = ({ content }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageAspects, setImageAspects] = useState({});
  const imageUrls = content.split('\n').filter(line => line.trim() !== '');

  useEffect(() => {
    // Check image dimensions
    imageUrls.forEach(url => {
      const img = new Image();
      img.onload = () => {
        setImageAspects(prev => ({
          ...prev,
          [url]: img.height > img.width
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

  return (
    <div className="photo-dump mt-16">
      <div className="photo-grid">
        {imageUrls.map((url, index) => (
          <div 
            key={index} 
            className={`photo-item ${imageAspects[url] ? 'vertical' : 'horizontal'}`}
            onClick={() => handleImageClick(url)}
            style={{ '--animation-order': index }}
          >
            <div className="relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl">
              <img 
                src={url} 
                alt={`Photo ${index + 1}`}
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center cursor-pointer"
          onClick={closeModal}
        >
          <div 
            className="relative max-w-7xl max-h-[90vh] mx-4"
            onClick={e => e.stopPropagation()}
          >
            <img 
              src={selectedImage} 
              alt="Selected photo"
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />
            <button 
              className="absolute top-4 right-4 text-white text-4xl hover:text-pink-300 transition-colors"
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