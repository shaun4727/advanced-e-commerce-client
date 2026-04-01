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
        let ctx = gsap.context(() => {
            const tl = gsap.timeline({
                delay: 0.5,
                // ScrollTrigger configuration
                scrollTrigger: {
                    trigger: trendingSection.current, // The container that activates the trigger
                    start: 'top 10%', // Start animation when top of trigger is 80% down the viewport
                    toggleActions: 'play none none none', // Play once on entry
                    // markers: true,           // Uncomment this line to debug trigger positions
                },
            });

            // --- Reveal The Headline ---
            tl.fromTo(
                '.reveal-bar-trending', // The red bar covering the text
                { scaleX: 1, transformOrigin: 'right' }, // Start state (fully expanded)
                { scaleX: 0, duration: 0.5, ease: 'power2.inOut' }, // End state (shrunk to reveal)
            )
                // Move the headline text slightly to enhance the effect
                .fromTo(
                    '.reveal-text-trending',
                    { x: 10, opacity: 0 },
                    { x: 0, opacity: 1, duration: 0.5, ease: 'power1.out' },
                    '<0.4', // Start this tween 0.2s after the previous one starts
                );

            gsap.from('.trending-card-anim', {
                scrollTrigger: {
                    trigger: trendingCardContainerRef.current, // The element to watch
                    start: 'top 2%', // <--- CHANGE THIS
                    toggleActions: 'play none none none',
                },
                y: 60,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
                stagger: 0.1,
            });

            gsap.from('.trending-button', {
                scrollTrigger: {
                    trigger: '.trending-button',
                    start: 'top 2%',
                    toggleActions: 'play none none none',
                },
                y: 60,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.inOut',
            });
        }, trendingSection);

        gsap.from('.trending-button', {
            scrollTrigger: {
                trigger: trendingCardContainerRef.current,
            },
        });

        /* GSAP Position Parameters Cheat Sheet:
        --------------------------------------
        '<'  : Start at the SAME TIME as the PREVIOUS animation starts.
        '>'  : Start at the EXACT MOMENT the PREVIOUS animation ends (Default).
        '+=' : Start with a GAP after the previous animation ends (e.g., '+=0.5').
        '-=' : Start BEFORE the previous animation ends (Overlap) (e.g., '-=0.2').
        '<'0.5 : Start 0.5s AFTER the PREVIOUS animation started.
        */

        return () => ctx.revert();
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
