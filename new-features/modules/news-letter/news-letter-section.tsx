'use client';

import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

// Assuming you have Shadcn UI setup and components installed
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function NewsletterSection() {
    // Reference for the entire section to animate
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            if (!sectionRef.current) return;

            // Define the GSAP animation timeline for this component
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current, // Start when this component is in view
                    start: 'top 80%', // Triggers when the top of the component is 80% down the viewport
                    toggleActions: 'play none none none', // Play once on enter
                    once: true, // Important: prevent re-triggering
                },
            });

            // Add the specified animation to the timeline
            tl.fromTo(
                sectionRef.current,
                {
                    height: 0, // Starts collapsed
                    opacity: 0,
                    y: -30,
                },
                {
                    height: 'auto', // Expands and pushes content down
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'expo.out',
                    // A slight delay like in your example, but handled relative to the trigger
                    delay: 0.2,
                },
            );
        },
        { scope: sectionRef }, // Scopes animations to only this ref's children
    );

    return (
        <section
            ref={sectionRef}
            className="newsletter-section overflow-hidden bg-[#1b2946]" // Applied specified bg color
        >
            <div className="mx-auto max-w-[1440px] px-4 md:px-10 lg:px-20 py-10 md:py-16">
                <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
                    {/* Left text content */}
                    <div className="md:max-w-xl ">
                        <h2 className="text-2xl font-smooch font-bold text-white md:text-3xl">
                            Subscribe to Our Newsletter
                        </h2>
                        <p className="mt-2 font-roboto-con text-base text-slate-200 md:text-lg">
                            Get the latest updates on new products and upcoming
                            sales
                        </p>
                    </div>

                    {/* Right form input and button */}
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center md:gap-3">
                        <Input
                            type="email"
                            placeholder="Enter your email address"
                            className="w-full sm:w-[320px] md:w-[400px] lg:w-[480px] h-12 bg-white text-slate-900 !rounded-none border-slate-300 placeholder:text-slate-500" // Overridden Shadcn rounded class
                        />
                        <Button
                            className="w-full h-12 !rounded-none bg-white font-semibold text-blue-600 hover:bg-slate-100 sm:w-auto" // Overridden Shadcn rounded class
                        >
                            Subscribe
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
