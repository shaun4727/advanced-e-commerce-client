'use client';

import Image from 'next/image';
import { useState } from 'react';

export const ProductGallery = ({ images }: { images: string[] }) => {
    const [selectedImage, setSelectedImage] = useState(0);

    return (
        <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-gray-100 overflow-hidden">
                <Image
                    src={images[selectedImage]}
                    alt={'Product Image'}
                    width={500}
                    height={500}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex space-x-2">
                {images.map((image, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`w-20 h-20 overflow-hidden border-2 transition-colors ${
                            selectedImage === index
                                ? 'border-blue-500'
                                : 'border-gray-200 hover:border-gray-300'
                        }`}
                    >
                        <Image
                            src={image}
                            alt={`product-image`}
                            width={80}
                            height={80}
                            className="w-full h-full object-cover"
                        />
                    </button>
                ))}
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center space-x-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`w-2 h-2  transition-colors ${
                            selectedImage === index
                                ? 'bg-blue-500'
                                : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};
