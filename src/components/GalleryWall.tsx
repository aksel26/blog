import React, { useState } from "react";

interface GalleryWallProps {
  images: string[];
}

const GalleryWall: React.FC<GalleryWallProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!images || images.length === 0) {
    return (
      <div
        className="flex items-center justify-center h-64 rounded-xl"
        style={{
          backgroundColor: "var(--bg-secondary)",
          border: "1px dashed var(--border-color)",
        }}
      >
        <p style={{ color: "var(--text-tertiary)" }}>이미지가 없습니다</p>
      </div>
    );
  }

  return (
    <>
      {/* Gallery Wall Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-2 gap-4 space-y-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="break-inside-avoid cursor-pointer group relative overflow-hidden rounded-lg transition-all duration-300 hover:scale-[1.02]"
            onClick={() => setSelectedImage(image)}
            style={{
              backgroundColor: "var(--bg-secondary)",
            }}
          >
            <img
              src={image}
              alt={`Gallery image ${index + 1}`}
              className="w-full h-auto object-cover transition-all duration-300"
              loading="lazy"
              style={{
                display: "block",
              }}
            />
            {/* Hover Overlay */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.3)",
              }}
            >
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.9)",
          }}
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full transition-colors"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              color: "white",
            }}
            onClick={() => setSelectedImage(null)}
            aria-label="Close"
          >
            <svg
              className="w-6 h-6"
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

          <img
            src={selectedImage}
            alt="Selected"
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Navigation Arrows */}
          <button
            className="absolute left-4 w-10 h-10 flex items-center justify-center rounded-full transition-colors"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              color: "white",
            }}
            onClick={(e) => {
              e.stopPropagation();
              const currentIndex = images.indexOf(selectedImage);
              const prevIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
              setSelectedImage(images[prevIndex]);
            }}
            aria-label="Previous image"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            className="absolute right-4 w-10 h-10 flex items-center justify-center rounded-full transition-colors"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              color: "white",
            }}
            onClick={(e) => {
              e.stopPropagation();
              const currentIndex = images.indexOf(selectedImage);
              const nextIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
              setSelectedImage(images[nextIndex]);
            }}
            aria-label="Next image"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Image Counter */}
          <div
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full text-sm font-medium"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              color: "white",
            }}
          >
            {images.indexOf(selectedImage) + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
};

export default GalleryWall;
