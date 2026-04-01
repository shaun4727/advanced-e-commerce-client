'use client';

import { homePageBrandWithProduct } from '@/services/Brand';
import { IBrand } from '@/types';
import { CategoryCard } from './category-components/category-card';

// GSAP Imports
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export const CategorySection = () => {
    const [data, setData] = useState<IBrand[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const categorySectionRef = useRef(null); // Ref for scoping animations
    const cardsContainerRef = useRef(null);

    // 1. Data Fetching (Move from 'async' to 'useEffect')
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await homePageBrandWithProduct();
                if (result?.data) {
                    setData(result.data);
                }
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    // 2. GSAP Animation Logic
    useLayoutEffect(() => {
        if (isLoading || data.length === 0) return;

        // Use gsap.context for safe scoping/cleanup in React
        let ctx = gsap.context(() => {
            const tl = gsap.timeline({
                delay: 0.7,
                // ScrollTrigger configuration
                scrollTrigger: {
                    trigger: '.reveal-trigger', // The container that activates the trigger
                    start: 'top 80%', // Start animation when top of trigger is 80% down the viewport
                    toggleActions: 'play none none none', // Play once on entry
                    // markers: true,           // Uncomment this line to debug trigger positions
                },
            });

            // --- Reveal The Headline ---
            tl.fromTo(
                '.reveal-bar-1', // The red bar covering the text
                { scaleX: 1, transformOrigin: 'right' }, // Start state (fully expanded)
                { scaleX: 0, duration: 0.8, ease: 'power2.inOut' }, // End state (shrunk to reveal)
            )
                // Move the headline text slightly to enhance the effect
                .fromTo(
                    '.reveal-text-1',
                    { x: 10, opacity: 0.5 },
                    { x: 0, opacity: 1, duration: 0.5, ease: 'power1.out' },
                    '<0.2', // Start this tween 0.2s after the previous one starts
                );

            // --- Reveal The Description ---
            tl.fromTo(
                '.reveal-bar-2',
                { scaleX: 1, transformOrigin: 'right' },
                { scaleX: 0, duration: 0.8, ease: 'power2.inOut' },
                '+=0.1', // Small delay after the headline finishes
            ).fromTo(
                '.reveal-text-2',
                { x: 10, opacity: 0.5 },
                { x: 0, opacity: 1, duration: 0.5, ease: 'power1.out' },
                '<0.2',
            );

            gsap.from('.category-card-anim', {
                scrollTrigger: {
                    trigger: cardsContainerRef.current, // Trigger on the container
                    start: 'top 85%', // Adjust this to trigger later (e.g., 'top 75%')
                    toggleActions: 'play none none none',
                },
                y: 60,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
                stagger: 0.1,
            });
        }, categorySectionRef); // Scoped to this container

        // Cleanup function for React Strict Mode
        return () => ctx.revert();
    }, [isLoading, data]); // Rerun when data is loaded

    // Loading/Error state (optional)
    if (isLoading)
        return <div className="text-center py-20">Loading Categories...</div>;
    if (data.length === 0) return null; // Or handle error state

    return (
        <>
            {/* category section */}
            <div
                className="w-full mt-16 md:mt-44 md:px-16"
                ref={categorySectionRef}
            >
                {/* Section Header */}
                <div className="mb-10 mt-7 text-center">
                    {/* -- REVEAL BOX 1 (Headline) -- */}
                    {/* The width here MUST match the text width (w-fit is useful) */}
                    <div className="relative overflow-hidden inline-block mb-4">
                        {/* The animated Red Bar (starting state covers text) */}
                        <div className="absolute inset-y-0 right-0 bg-revealer z-10 reveal-bar-1 w-full" />

                        {/* The Text Underneath */}
                        <h2 className="text-3xl font-bold text-gray-900 relative reveal-text-1">
                            Shop by Category
                        </h2>
                    </div>
                    <div className="mb-1" /> {/* Spacer */}
                    {/* -- REVEAL BOX 2 (Description) -- */}
                    <div className="relative overflow-hidden inline-block max-w-2xl mx-auto">
                        <div className="absolute inset-y-0 right-0 bg-revealer z-10 reveal-bar-2 w-full" />

                        <p className="text-gray-600 relative reveal-text-2">
                            Discover our wide range of products across different
                            categories
                        </p>
                    </div>
                </div>

                <div ref={cardsContainerRef}>
                    <div className="flex gap-2.5 overflow-x-auto md:hidden">
                        {data.map((category: IBrand, index: number) => (
                            <div
                                key={index}
                                className="shrink-0 cursor-pointer category-card-anim"
                            >
                                <CategoryCard category={category} />
                            </div>
                        ))}
                    </div>

                    <div className="hidden md:grid grid-cols-3 lg:grid-cols-5 xl:grid-cols-4 gap-6">
                        {data?.map((category: IBrand, index: number) => (
                            <div key={index} className="category-card-anim">
                                <CategoryCard category={category} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};
