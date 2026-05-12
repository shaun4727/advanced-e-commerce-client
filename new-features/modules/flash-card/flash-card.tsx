'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useRef } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Register ScrollTrigger so GSAP knows how to handle scroll events
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const promoData = [
    {
        id: 'promo-1',
        category: 'Mega Sale',
        title: 'Up to 50% Off',
        description: 'On electronics & accessories',
        buttonText: 'Shop Now',
        bgColor: 'bg-[#F4F0FF]', // Soft purple
        accentColor: 'text-[#4C1D95]',
        btnColor: 'bg-[#3B0764] hover:bg-[#581C87] text-white',
        // Using an Unsplash placeholder for headphones
        image: '/images/headset.png',
    },
    {
        id: 'promo-2',
        category: 'Fresh Deals',
        title: 'Up to 30% Off',
        description: 'On Fruits & Vegetables',
        buttonText: 'Shop Now',
        bgColor: 'bg-[#F0FDF4]', // Soft green
        accentColor: 'text-[#166534]',
        btnColor: 'bg-[#15803D] hover:bg-[#166534] text-white',
        // Using an Unsplash placeholder for vegetables
        image: '/images/fresh-vegetables.png',
    },
    {
        id: 'promo-3',
        category: 'Fashion Fest',
        title: 'Min. 40% Off',
        description: 'On latest collection',
        buttonText: 'Shop Now',
        bgColor: 'bg-[#F0F8FF]', // Soft blue
        accentColor: 'text-[#1E40AF]',
        btnColor: 'bg-[#1D4ED8] hover:bg-[#1E3A8A] text-white',
        // Using an Unsplash placeholder for fashion
        image: '/images/blue-jacket.png',
    },
];

export function PromoCards() {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            // Reveal cards from left to right when scrolling into view
            gsap.from('.boxy-promo-card', {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%', // Animation starts when the top of the section hits 80% of the viewport height
                    toggleActions: 'play none none none', // Plays on enter, reverses if scrolled back up
                },
                x: -100,
                opacity: 0,
                stagger: 0.15, // Delay between each card's animation
                duration: 0.8,
                ease: 'power3.out',
            });
        },
        { scope: sectionRef },
    );

    return (
        <section
            ref={sectionRef}
            // min-h-screen ensures it takes full height, flex centers it vertically
            className="w-full flex items-center justify-center p-4 md:p-4 bg-background overflow-hidden"
        >
            <div className="w-full  mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
                {promoData.map((promo) => (
                    <div
                        key={promo.id}
                        // `rounded-none` forces the boxy shape as requested
                        className={cn(
                            'boxy-promo-card relative flex flex-col justify-center overflow-hidden p-8 h-[280px] md:h-[320px] rounded-none border border-black/5 shadow-sm',
                            promo.bgColor,
                        )}
                    >
                        {/* Content (Z-10 to stay above the image) */}
                        <div className="relative z-10 max-w-[60%] space-y-4">
                            <div className="space-y-1">
                                <p
                                    className={cn(
                                        'text-sm font-bold tracking-widest uppercase',
                                        promo.accentColor,
                                    )}
                                >
                                    {promo.category}
                                </p>
                                <h3
                                    className={cn(
                                        'text-2xl md:text-3xl font-black tracking-tight',
                                        promo.accentColor,
                                    )}
                                >
                                    {promo.title}
                                </h3>
                            </div>

                            <p className="text-sm text-gray-700 font-medium pb-2">
                                {promo.description}
                            </p>

                            {/* Shadcn Button with rounded-none override */}
                            <Button
                                className={cn(
                                    'rounded-none font-bold tracking-wider px-6 uppercase flex items-center gap-2 group',
                                    promo.btnColor,
                                )}
                            >
                                {promo.buttonText}
                                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </div>

                        {/* Background Product Image */}
                        <div className="absolute right-0 bottom-0 h-full w-full pointer-events-none">
                            <Image
                                src={promo.image}
                                alt={promo.category}
                                fill
                                className="object-contain object-bottom mix-blend-multiply "
                                sizes="(max-width: 768px) 50vw, 33vw"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
