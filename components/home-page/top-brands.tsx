'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

import { IBrand } from '@/types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '../ui/button';
import { BrandCard } from './brand-components/brand-card';

export const TopBrandsComponent = ({ allBrands }: { allBrands: IBrand[] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerView = {
        mobile: 2,
        tablet: 3,
        desktop: 5,
    };

    const router = useRouter();

    const nextSlide = () => {
        setCurrentIndex(
            (prev) =>
                (prev + 1) %
                Math.max(1, allBrands.length - itemsPerView.desktop + 1),
        );
    };

    const prevSlide = () => {
        setCurrentIndex(
            (prev) =>
                (prev -
                    1 +
                    Math.max(1, allBrands.length - itemsPerView.desktop + 1)) %
                Math.max(1, allBrands.length - itemsPerView.desktop + 1),
        );
    };

    return (
        <div className="my-8 px-2.5">
            <div className="flex justify-between">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        Top Brands
                    </h2>
                    <p className="text-gray-600">
                        Discover products from the worlds leading brands
                    </p>
                </div>

                {/* Navigation Arrows */}
                <div className="hidden lg:flex items-center space-x-2">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={prevSlide}
                        className="rounded-full hover:bg-blue-50 hover:border-blue-300"
                        disabled={currentIndex === 0}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={nextSlide}
                        className="rounded-full hover:bg-blue-50 hover:border-blue-300"
                        disabled={
                            currentIndex >=
                            allBrands.length - itemsPerView.desktop
                        }
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Brands Grid */}
            <div className="relative mt-4">
                {/* Desktop Carousel */}
                <div className="hidden lg:block overflow-hidden">
                    <div
                        className="flex transition-transform duration-300 ease-in-out"
                        style={{
                            transform: `translateX(-${currentIndex * (100 / itemsPerView.desktop)}%)`,
                        }}
                    >
                        {allBrands?.map((brand, index) => (
                            <div
                                key={index}
                                className="w-1/5 shrink-0 px-3 cursor-pointer"
                            >
                                <BrandCard brand={brand} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tablet Grid */}
                <div className="hidden md:grid lg:hidden grid-cols-3 gap-6">
                    {allBrands?.slice(0, 6).map((brand, index) => (
                        <BrandCard key={index} brand={brand} />
                    ))}
                </div>

                {/* Mobile Grid */}
                <div className="md:hidden grid grid-cols-2 gap-4">
                    {allBrands?.slice(0, 4).map((brand, index) => (
                        <BrandCard key={index} brand={brand} />
                    ))}
                </div>
            </div>
        </div>
    );
};
