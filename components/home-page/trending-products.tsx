'use client';

import { Button } from '../ui/button';
import { ProductCard } from './product-components/product-card';

export const TrendingProducts = () => {
    return (
        <div className="w-full mt-16 px-2.5">
            <h2 className="text-2xl text-center mb-8 font-bold text-gray-900">
                Our Trending Products
            </h2>
            {/* Mobile Grid */}
            <div className="md:hidden grid grid-cols-2 gap-4">
                {Array.from([1, 2, 3, 4]).map((_, index) => (
                    <ProductCard key={index} />
                ))}
            </div>

            {/* View All Button */}
            <div className="text-center mt-8">
                <Button
                    variant="outline"
                    onClick={() => {}}
                    size="lg"
                    className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors duration-200"
                >
                    View All Trending
                </Button>
            </div>
        </div>
    );
};
