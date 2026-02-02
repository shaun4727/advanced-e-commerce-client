'use client';

import { IProduct } from '@/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '../ui/button';
import { ProductCard } from './product-components/product-card';

export const TrendingProducts = ({
    trendingProducts,
}: {
    trendingProducts: IProduct[];
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerView = 4;

    const router = useRouter();

    const nextSlide = () => {
        setCurrentIndex(
            (prev) =>
                (prev + 1) %
                Math.max(1, trendingProducts.length - itemsPerView + 1),
        );
    };

    const prevSlide = () => {
        setCurrentIndex(
            (prev) =>
                (prev -
                    1 +
                    Math.max(1, trendingProducts.length - itemsPerView + 1)) %
                Math.max(1, trendingProducts.length - itemsPerView + 1),
        );
    };

    return (
        <div className="w-full mt-16 px-2.5">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900">
                    Our Trending Products
                </h2>

                {/* Navigation Arrows */}
                <div className="hidden md:flex items-center space-x-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={prevSlide}
                        className="rounded-full hover:bg-gray-100"
                        disabled={currentIndex === 0}
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={nextSlide}
                        className="rounded-full hover:bg-gray-100"
                        disabled={
                            currentIndex >=
                            trendingProducts.length - itemsPerView
                        }
                    >
                        <ChevronRight className="h-5 w-5" />
                    </Button>
                </div>
            </div>

            <div className="relative">
                {/* Mobile Grid */}
                <div className="md:hidden grid grid-cols-2 gap-4">
                    {trendingProducts.map((product: IProduct, index) => (
                        <ProductCard key={index} product={product} />
                    ))}
                </div>
                {/* Desktop Grid */}
                <div className="hidden md:block py-4 overflow-hidden">
                    <div
                        className="flex transition-transform duration-300 ease-in-out"
                        style={{
                            transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
                        }}
                    >
                        {trendingProducts?.map((product: IProduct, index) => (
                            <div
                                key={index}
                                className="w-1/4 shrink-0 px-3 cursor-pointer"
                            >
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* View All Button */}
            <div className="text-center mt-8">
                <Button
                    variant="outline"
                    onClick={() => {
                        router.push(`/products?trending=1`);
                    }}
                    size="lg"
                    className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors duration-200"
                >
                    View All Trending
                </Button>
            </div>
        </div>
    );
};
