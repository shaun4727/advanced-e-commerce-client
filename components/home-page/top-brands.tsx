'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

import { IBrand } from '@/types';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRouter } from 'next/navigation';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Button } from '../ui/button';
import { BrandCard } from './brand-components/brand-card';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export const TopBrandsComponent = ({ allBrands }: { allBrands: IBrand[] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const topBrandSectionRef = useRef(null);
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

    useEffect(() => {
        // This forces GSAP to recalculate the 'start' and 'end' points
        // of all ScrollTriggers once the products are actually rendered.
        if (allBrands?.length > 0) {
            ScrollTrigger.refresh();
        }
    }, [allBrands]);

    useLayoutEffect(() => {
        if (!allBrands || allBrands.length === 0) return;

        let ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: topBrandSectionRef.current,
                    start: 'bottom 10%', // Triggers when the section is visible
                    toggleActions: 'play none none none',
                },
            });

            // Header Reveal
            tl.fromTo(
                '.brand-bar-revealer-1',
                { scaleX: 1, transformOrigin: 'right' },
                { scaleX: 0, duration: 0.5, ease: 'power2.inOut' },
            )
                .fromTo(
                    '.brand-text-revealer-1',
                    { x: 10, opacity: 0 },
                    { x: 0, opacity: 1, duration: 0.5 },
                    '<0.4',
                )
                .fromTo(
                    '.brand-bar-revealer-2',
                    { scaleX: 1, transformOrigin: 'right' },
                    { scaleX: 0, duration: 0.5, ease: 'power2.inOut' },
                    '-=0.3', // Overlap with previous
                )
                .fromTo(
                    '.brand-text-revealer-2',
                    { x: 10, opacity: 0 },
                    { x: 0, opacity: 1, duration: 0.5 },
                    '<0.4',
                );
            // Integrated Card Animation (Smoother than separate triggers)
            gsap.from('.brand-card-anim', {
                scrollTrigger: {
                    trigger: topBrandSectionRef.current, // The element to watch
                    start: 'bottom 5%', // <--- CHANGE THIS
                    toggleActions: 'play none none none',
                },
                y: 60,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
                stagger: 0.1,
            });
        }, topBrandSectionRef);

        return () => ctx.revert();
    }, [allBrands]);

    /* GSAP Position Parameters Cheat Sheet:
        --------------------------------------
        '<'  : Start at the SAME TIME as the PREVIOUS animation starts.
        '>'  : Start at the EXACT MOMENT the PREVIOUS animation ends (Default).
        '+=' : Start with a GAP after the previous animation ends (e.g., '+=0.5').
        '-=' : Start BEFORE the previous animation ends (Overlap) (e.g., '-=0.2').
        '<'0.5 : Start 0.5s AFTER the PREVIOUS animation started.
        */

    return (
        <div className="my-8 px-2.5 md:px-16" ref={topBrandSectionRef}>
            <div className="flex justify-between">
                <div>
                    <div className="relative">
                        <p className="absolute brand-bar-revealer-1 bg-revealer w-full inset-y-0 right-0"></p>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2 brand-text-revealer-1">
                            Top Brands
                        </h2>
                    </div>
                    <div className="relative">
                        <p className="absolute bg-revealer w-full inset-y-0 right-0 brand-bar-revealer-2"></p>
                        <p className="text-gray-600 brand-text-revealer-2">
                            Discover products from the worlds leading brands
                        </p>
                    </div>
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
                                className="w-1/5 shrink-0 px-3 cursor-pointer brand-card-anim"
                            >
                                <BrandCard brand={brand} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tablet Grid */}
                <div className="hidden md:grid lg:hidden grid-cols-3 gap-6">
                    {allBrands?.slice(0, 6).map((brand, index) => (
                        <div key={index} className="brand-card-anim">
                            <BrandCard brand={brand} />
                        </div>
                    ))}
                </div>

                {/* Mobile Grid */}
                <div className="md:hidden grid grid-cols-2 gap-4">
                    {allBrands?.slice(0, 4).map((brand, index) => (
                        <div key={index} className="brand-card-anim">
                            <BrandCard brand={brand} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
