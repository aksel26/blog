import React, { useState } from "react";

interface BentoGridGalleryProps {
  images: string[];
}

const BentoGridGallery: React.FC<BentoGridGalleryProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!images || images.length === 0) {
    return null;
  }

  // Bento grid 레이아웃 패턴 정의
  const getBentoGridClass = (index: number, totalImages: number) => {
    if (totalImages === 1) return "row-span-2 col-span-2";
    if (totalImages === 2) {
      return index === 0 ? "row-span-2 col-span-2" : "row-span-1 col-span-2";
    }
    if (totalImages === 3) {
      return index === 0 ? "row-span-2 col-span-2" : "row-span-1 col-span-1";
    }

    // 4개 이상일 때 패턴
    const pattern = index % 6;
    if (pattern === 0) return "row-span-2 col-span-2";
    if (pattern === 1) return "row-span-1 col-span-1";
    if (pattern === 2) return "row-span-1 col-span-1";
    if (pattern === 3) return "row-span-1 col-span-2";
    if (pattern === 4) return "row-span-2 col-span-1";
    return "row-span-1 col-span-1";
  };

  return (
    <>
      <div className="sticky top-24 h-fit">
        <div
          className="grid grid-cols-2 auto-rows-[150px] gap-3 rounded-2xl p-4"
          style={{
            backgroundColor: "var(--bg-secondary)",
          }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className={`${getBentoGridClass(index, images.length)} overflow-hidden rounded-xl cursor-pointer group relative`}
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={image}
                alt={`Gallery image ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div
                className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"
              />
            </div>
          ))}
        </div>
      </div>

      {/* 이미지 모달 */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white text-4xl font-light hover:opacity-70 transition-opacity"
            onClick={() => setSelectedImage(null)}
            aria-label="Close modal"
          >
            ×
          </button>
          <img
            src={selectedImage}
            alt="Full size"
            className="max-w-full max-h-full object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
};

export default BentoGridGallery;
