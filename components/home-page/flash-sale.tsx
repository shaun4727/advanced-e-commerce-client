'use client';

import { IProduct } from '@/types';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Button } from '../ui/button';
import { CountdownTimer } from './flash-sale-components/count-down-timer';
import { ProductCard } from './flash-sale-components/product-card';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export const FlashSale = ({
    flashSaleProducts,
}: {
    flashSaleProducts: IProduct[];
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerView = 4;
    const router = useRouter();
    const flashSaleSectionRef = useRef(null);

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

    useEffect(() => {
        // This forces GSAP to recalculate the 'start' and 'end' points
        // of all ScrollTriggers once the products are actually rendered.
        if (flashSaleProducts?.length > 0) {
            ScrollTrigger.refresh();
        }
    }, [flashSaleProducts]);

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
                    delay: 0.5,
                    scrollTrigger: {
                        trigger: flashSaleSectionRef.current,
                        // Desktop starts at 10%, Mobile triggers earlier at 85% down the screen
                        start: isDesktop ? 'top 10%' : 'top 75%',
                        toggleActions: 'play none none none', // Play once on entry
                    },
                });

                // --- Reveal The Headline ---
                tl.fromTo(
                    '.flash-bar-revealer', // The red bar covering the text
                    { scaleX: 1, transformOrigin: 'right' }, // Start state (fully expanded)
                    { scaleX: 0, duration: 0.5, ease: 'power2.inOut' }, // End state (shrunk to reveal)
                )
                    // Move the headline text slightly to enhance the effect
                    .fromTo(
                        '.flash-text-revealer',
                        { x: 10, opacity: 0 },
                        { x: 0, opacity: 1, duration: 0.5, ease: 'power1.out' },
                        '<0.4', // Start this tween 0.2s after the previous one starts
                    )
                    .from('.flash-sign', { x: 30, opacity: 0 }, '<0.4')
                    .from('.flash-timer', { y: 10, opacity: 0 }, '<0.3');

                // --- Desktop Specific Animation ---
                if (isDesktop) {
                    gsap.from('.flash-card-anim', {
                        scrollTrigger: {
                            trigger: flashSaleSectionRef.current, // The element to watch
                            start: 'bottom 35%', // <--- CHANGE THIS
                            toggleActions: 'play none none none',
                        },
                        y: 60,
                        opacity: 0,
                        duration: 0.8,
                        ease: 'power3.out',
                        stagger: 0.1,
                    });

                    gsap.from('.flash-button', {
                        scrollTrigger: {
                            trigger: '.flash-button',
                            start: 'top 2%',
                            toggleActions: 'play none none none',
                        },
                        y: 60,
                        opacity: 0,
                        duration: 0.8,
                        ease: 'power3.inOut',
                    });
                }

                // --- Mobile Specific Animation ---
                if (isMobile) {
                    gsap.from('.flash-card-anim', {
                        scrollTrigger: {
                            trigger: flashSaleSectionRef.current, // The element to watch
                            start: 'bottom 85%', // <--- CHANGE THIS
                            toggleActions: 'play none none none',
                        },
                        y: 60,
                        opacity: 0,
                        duration: 0.8,
                        ease: 'power3.out',
                        stagger: 0.1,
                    });

                    gsap.from('.flash-button', {
                        scrollTrigger: {
                            trigger: '.flash-button',
                            start: 'top 85%',
                            toggleActions: 'play none none none',
                        },
                        y: 60,
                        opacity: 0,
                        duration: 0.8,
                        ease: 'power3.inOut',
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
    }, [flashSaleProducts]);

    return (
        <div className="w-full mt-16 px-2.5 md:px-16" ref={flashSaleSectionRef}>
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center flash-sign">
                            <Zap className="h-5 w-5 text-white" />
                        </div>
                        <div className="relative">
                            <p className="absolute inset-y-0 right-0 w-full bg-revealer flash-bar-revealer"></p>
                            <h2 className="text-2xl font-bold text-gray-900 flash-text-revealer">
                                Flash Sale
                            </h2>
                        </div>
                    </div>
                    <div className="flash-timer">
                        <CountdownTimer />
                    </div>
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
            <div className="relative ">
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
                                className="w-1/4 shrink-0 px-3 cursor-pointer flash-card-anim"
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
                                className="w-64 shrink-0 flash-card-anim"
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
                    className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors duration-200 flash-button"
                >
                    View All Flash Sale Items
                </Button>
            </div>
        </div>
    );
};
