import Image from 'next/image';

export const ProductGallery = () => {
    const images = [1, 2, 3, 4, 5, 6];
    const selectedImage = 2;
    return (
        <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <Image
                    src={'/no-image'}
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
                        onClick={() => {}}
                        className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                            selectedImage === index
                                ? 'border-blue-500'
                                : 'border-gray-200 hover:border-gray-300'
                        }`}
                    >
                        <Image
                            src={'/no-image'}
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
                        onClick={() => {}}
                        className={`w-2 h-2 rounded-full transition-colors ${
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
