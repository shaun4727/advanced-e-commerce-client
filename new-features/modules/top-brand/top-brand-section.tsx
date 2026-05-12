'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef } from 'react';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const brandsData = [
    {
        name: 'Intel',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7d/Intel_logo_%282006-2020%29.svg',
        description: 'Here can be any description',
        products: '10 Products',
    },
    {
        name: 'Sony',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c4/Sony_logo.svg',
        description: 'Here can be any description',
        products: '10 Products',
    },
    {
        name: 'Tesla',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg',
        description: 'Here can be any description',
        products: '10 Products',
    },
    {
        name: 'Amazon',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
        description: 'Here can be any description',
        products: '10 Products',
    },
    {
        name: 'Google',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
        description: 'Here can be any description',
        products: '10 Products',
    },
    {
        name: 'Tesla',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg',
        description: 'Here can be any description',
        products: '10 Products',
    },
    {
        name: 'Amazon',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
        description: 'Here can be any description',
        products: '10 Products',
    },
];

export default function TopBrands() {
    // 1. ADDED TYPES HERE: <HTMLElement> and <HTMLDivElement>
    const sectionRef = useRef<HTMLElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;

        // GSAP Animation: Reveal from bottom to top
        gsap.fromTo(
            section,
            {
                y: 100,
                opacity: 0,
            },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                },
            },
        );
    }, []);

    // 2. ADDED TYPE HERE: direction can only be 'left' or 'right'
    const scroll = (direction: 'left' | 'right') => {
        if (sliderRef.current) {
            const { current } = sliderRef;
            const scrollAmount =
                direction === 'left'
                    ? -current.clientWidth
                    : current.clientWidth;
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <section
            ref={sectionRef}
            className="w-full flex flex-col justify-center px-4 py-16 bg-white"
        >
            <style>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
            `}</style>

            <div className="w-full">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
                    <div>
                        <h2 className="text-[4vw] font-smooch uppercase  font-bold text-slate-900">
                            Top Brands
                        </h2>
                        <p className="text-slate-500 font-roboto-con text-xl font-bold">
                            Discover products from the worlds leading brands
                        </p>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={() => scroll('left')}
                            className="flex items-center justify-center w-10 h-10 border border-slate-200 hover:bg-slate-50 transition-colors"
                        >
                            <ChevronLeft className="w-5 h-5 text-slate-600" />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="flex items-center justify-center w-10 h-10 border border-slate-200 hover:bg-slate-50 transition-colors"
                        >
                            <ChevronRight className="w-5 h-5 text-slate-600" />
                        </button>
                    </div>
                </div>

                <div
                    ref={sliderRef}
                    className="flex overflow-x-auto gap-6 snap-x snap-mandatory no-scrollbar"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {brandsData.map((brand, index) => (
                        <div
                            key={index}
                            className="shrink-0 w-full sm:w-[calc(50%-12px)] md:w-[calc(33.33%-16px)] lg:w-[calc(20%-19.2px)] snap-start flex flex-col items-center p-6 border border-slate-200 bg-card text-card-foreground shadow-sm rounded-none hover:shadow-md transition-shadow"
                        >
                            <div className="h-20 w-full flex items-center justify-center mb-6">
                                <img
                                    src={brand.logo}
                                    alt={`${brand.name} logo`}
                                    className="max-h-12 max-w-[120px] object-contain opacity-80"
                                />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">
                                {brand.name}
                            </h3>
                            <p className="text-xs text-slate-500 text-center mb-4">
                                {brand.description}
                            </p>
                            <a
                                href="#"
                                className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                            >
                                {brand.products}
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
