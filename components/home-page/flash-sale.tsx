'use client';

import { IProduct } from '@/types';
import { ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '../ui/button';
import { CountdownTimer } from './flash-sale-components/count-down-timer';
import { ProductCard } from './flash-sale-components/product-card';

export const FlashSale = ({
    flashSaleProducts,
}: {
    flashSaleProducts: IProduct[];
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerView = 4;
    const router = useRouter();

    const nextSlide = () => {
        setCurrentIndex(
            (prev) =>
                (prev + 1) %
                Math.max(1, flashSaleProducts.length - itemsPerView + 1),
        );
    };

    const prevSlide = () => {
        setCurrentIndex(
            (prev) =>
                (prev -
                    1 +
                    Math.max(1, flashSaleProducts.length - itemsPerView + 1)) %
                Math.max(1, flashSaleProducts.length - itemsPerView + 1),
        );
    };

    const viewProduct = (product: IProduct) => {
        router.push(`/products/${product._id}`);
    };

    return (
        <div className="w-full mt-16 px-2.5">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                            <Zap className="h-5 w-5 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">
                            Flash Sale
                        </h2>
                    </div>
                    <CountdownTimer />
                </div>

                {/* Navigation Arrows */}
                <div className="hidden md:flex items-center space-x-2">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={prevSlide}
                        className="rounded-full"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={nextSlide}
                        className="rounded-full"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Products Grid */}
            <div className="relative">
                {/* Desktop Grid */}
                <div className="hidden md:block py-4 overflow-hidden">
                    <div
                        className="flex transition-transform duration-300 ease-in-out"
                        style={{
                            transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
                        }}
                    >
                        {flashSaleProducts?.map((product: IProduct, index) => (
                            <div
                                key={index}
                                className="w-1/4 shrink-0 px-3 cursor-pointer"
                                onClick={() => viewProduct(product)}
                            >
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mobile Scroll */}
                <div className="md:hidden">
                    <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
                        {flashSaleProducts?.map((product: IProduct, index) => (
                            <div
                                key={index}
                                className="w-64 shrink-0"
                                onClick={() => viewProduct(product)}
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
                        router.push(`/products?flashSale=1`);
                    }}
                    size="lg"
                    className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors duration-200"
                >
                    View All Flash Sale Items
                </Button>
            </div>
        </div>
    );
};
