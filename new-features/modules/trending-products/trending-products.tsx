import { Product, ProductSlider } from '@/components/ui/core/custom-slider';

// Mock data based on your screenshot
const featuredProducts: Product[] = [
    {
        id: 'p1',
        name: 'T1 Werkpant',
        price: 89.0,
        rating: 4.8,
        tag: 'Moisture Wicking',
        image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=400', // Replace with real image
        colors: ['#B8860B', '#556B2F', '#708090', '#2F4F4F', '#191970'],
        extraColorsCount: 2,
    },
    {
        id: 'p2',
        name: 'T1 Werkshort',
        price: 79.0,
        rating: 4.8,
        tag: 'Bestseller',
        promo: 'Buy One, Get One 30% Off',
        image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=400',
        colors: ['#B8860B', '#556B2F', '#708090', '#2F4F4F', '#556B2F'],
        extraColorsCount: 1,
    },
    {
        id: 'p3',
        name: 'Cloud Werkshort',
        price: 59.0,
        rating: 4.8,
        tag: 'Fast Drying',
        promo: 'Buy One, Get One 30% Off',
        image: 'https://images.unsplash.com/photo-1560829675-11dec1d78930?q=80&w=400',
        colors: ['#708090', '#556B2F', '#D3D3D3', '#2F4F4F', '#4682B4'],
        extraColorsCount: 2,
    },
    {
        id: 'p4',
        name: 'B1 Sun Hoodie',
        price: 49.0,
        rating: 4.8,
        tag: 'UV Protection',
        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=400',
        colors: ['#4682B4', '#9ACD32', '#F5DEB3', '#FF1493', '#556B2F'],
        extraColorsCount: 9,
    },
    {
        id: 'p5',
        name: 'Cloud Werkshort',
        price: 59.0,
        rating: 4.8,
        tag: 'Fast Drying',
        promo: 'Buy One, Get One 30% Off',
        image: 'https://images.unsplash.com/photo-1560829675-11dec1d78930?q=80&w=400',
        colors: ['#708090', '#556B2F', '#D3D3D3', '#2F4F4F', '#4682B4'],
        extraColorsCount: 2,
    },
    {
        id: 'p6',
        name: 'B1 Sun Hoodie',
        price: 49.0,
        rating: 4.8,
        tag: 'UV Protection',
        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=400',
        colors: ['#4682B4', '#9ACD32', '#F5DEB3', '#FF1493', '#556B2F'],
        extraColorsCount: 9,
    },
    // Add more items here to test the sliding!
];

export const TrendingProducts = () => {
    return (
        <div>
            <div className="flex items-center space-x-4 mx-4">
                <div className="flex items-center space-x-3">
                    <div className="relative">
                        <h2 className="text-2xl uppercase font-bold text-gray-900 flash-text-revealer">
                            Trending Products
                        </h2>
                    </div>
                </div>
            </div>
            <ProductSlider products={featuredProducts} />;
        </div>
    );
};
