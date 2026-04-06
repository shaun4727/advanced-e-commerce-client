'use client';

import { IProduct } from '@/types';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Button } from '../ui/button';
import { ProductCard } from './product-components/product-card';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export const TrendingProducts = ({
    trendingProducts,
}: {
    trendingProducts: IProduct[];
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerView = 4;
    const trendingSection = useRef(null);
    const trendingCardContainerRef = useRef(null);

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

    const viewProduct = (product: IProduct) => {
        router.push(`/products/${product._id}`);
    };

    useEffect(() => {
        // This forces GSAP to recalculate the 'start' and 'end' points
        // of all ScrollTriggers once the products are actually rendered.
        if (trendingProducts?.length > 0) {
            ScrollTrigger.refresh();
        }
    }, [trendingProducts]);

    useLayoutEffect(() => {
        const mm = gsap.matchMedia();

        mm.add(
            {
                // Define your breakpoints
                isDesktop: '(min-width: 768px)',
                isMobile: '(max-width: 767px)',
            },
            (context) => {
                const { isDesktop, isMobile } = context.conditions || {};

                // Common Header Animation (Works on both, but we can tweak values)
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: trendingSection.current,
                        // Desktop starts at 10%, Mobile triggers earlier at 85% down the screen
                        start: isDesktop ? 'top 5%' : 'top 75%',
                        once: true,
                    },
                });

                tl.fromTo(
                    '.reveal-bar-trending',
                    { scaleX: 1, transformOrigin: 'right' },
                    { scaleX: 0, duration: 0.5 },
                );

                // --- Desktop Specific Animation ---
                if (isDesktop) {
                    gsap.from('.trending-card-anim', {
                        scrollTrigger: {
                            trigger: trendingCardContainerRef.current,
                            start: 'top 7%',
                        },
                        x: 100, // Slide in from the right on desktop
                        opacity: 0,
                        stagger: 0.1,
                        duration: 1,
                    });
                }

                // --- Mobile Specific Animation ---
                if (isMobile) {
                    gsap.from('.trending-card-anim', {
                        scrollTrigger: {
                            trigger: trendingCardContainerRef.current,
                            start: 'top 75%', // Trigger much earlier on scroll
                        },
                        y: 30, // Subtle lift up on mobile
                        opacity: 0,
                        stagger: 0.05, // Faster stagger for mobile grids
                        duration: 0.6,
                    });
                }
            },
        );
        /* GSAP Position Parameters Cheat Sheet:
        --------------------------------------
        '<'  : Start at the SAME TIME as the PREVIOUS animation starts.
        '>'  : Start at the EXACT MOMENT the PREVIOUS animation ends (Default).
        '+=' : Start with a GAP after the previous animation ends (e.g., '+=0.5').
        '-=' : Start BEFORE the previous animation ends (Overlap) (e.g., '-=0.2').
        '<'0.5 : Start 0.5s AFTER the PREVIOUS animation started.
        */
        return () => mm.revert(); // Clean up everything!
    }, [trendingProducts]);

    return (
        <div className="w-full mt-16 px-2.5 md:px-16" ref={trendingSection}>
            {/* Section Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="relative">
                    <p className="absolute bg-revealer w-full inset-y-0 right-0 reveal-bar-trending"></p>
                    <h2 className="text-2xl font-bold text-gray-900 reveal-text-trending">
                        Our Trending Products
                    </h2>
                </div>

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

            <div className="relative" ref={trendingCardContainerRef}>
                {/* Mobile Grid */}
                <div className="md:hidden grid grid-cols-2 gap-4">
                    {trendingProducts.map((product: IProduct, index) => (
                        <div
                            key={index}
                            onClick={() => {
                                viewProduct(product);
                            }}
                            className="trending-card-anim"
                        >
                            <ProductCard product={product} />
                        </div>
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
                                className="w-1/4 shrink-0 px-3 cursor-pointer trending-card-anim"
                                onClick={() => {
                                    viewProduct(product);
                                }}
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
                    className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors duration-200 trending-button"
                >
                    View All Trending
                </Button>
            </div>
        </div>
    );
};
