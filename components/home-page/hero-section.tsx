'use client';

import { useIsMobile } from '@/hooks/use-mobile';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { benefits, heroSlides } from './constants';

export const HeroSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const isMobile = useIsMobile();

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    };

    const prevSlide = () => {
        setCurrentSlide(
            (prev) => (prev - 1 + heroSlides.length) % heroSlides.length,
        );
    };

    const currentHero = heroSlides[currentSlide];
    return (
        <div className="w-full md:px-16 z-10">
            <div className="h-75 mt-4 relative w-full bg-black/40 md:mt-8">
                <div className="absolute inset-0">
                    <Image
                        src={currentHero?.image || '/placeholder.svg'}
                        alt={currentHero.title}
                        fill
                        className="object-cover"
                        priority
                    />
                    {/* Content */}
                    <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
                        <div className="max-w-2xl text-white">
                            {/* Top Text */}
                            <p className="text-sm md:text-base font-medium tracking-wider mb-2 opacity-90">
                                {currentHero.topText}
                            </p>

                            {/* Main Title */}
                            <h1 className="text-4xl md:text-6xl lg:text-4xl font-bold mb-4 leading-tight">
                                {currentHero.title}
                            </h1>

                            {/* Subtitle */}
                            <p className="text-lg md:text-xl mb-8 opacity-90 max-w-lg">
                                {currentHero.subtitle}
                            </p>

                            {/* CTA Button */}
                            <Link href="/products">
                                <Button
                                    size="lg"
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-md font-semibold rounded-md transition-colors duration-200"
                                >
                                    {currentHero.buttonText}
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Navigation Arrows */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white rounded-full h-12 w-12"
                        onClick={prevSlide}
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white rounded-full h-12 w-12"
                        onClick={nextSlide}
                    >
                        <ChevronRight className="h-6 w-6" />
                    </Button>

                    {/* Slide Indicators */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
                        {heroSlides.map((_, index) => (
                            <button
                                key={index}
                                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                                    index === currentSlide
                                        ? 'bg-white'
                                        : 'bg-white/50'
                                }`}
                                onClick={() => setCurrentSlide(index)}
                            />
                        ))}
                    </div>
                    {/* Benefits Section */}

                    {!isMobile ? (
                        <div className="bg-blue-600 h-24">
                            <div className="container mx-auto px-4 ">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {benefits.map((benefit, index) => (
                                        <Card
                                            key={index}
                                            className="bg-transparent border-0 shadow-none"
                                        >
                                            <CardContent className="flex items-center space-x-4 px-6  text-white">
                                                <div className="shrink-0">
                                                    {benefit.icon}
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-lg mb-1">
                                                        {benefit.title}
                                                    </h3>
                                                    <p className="text-blue-100 text-sm">
                                                        {benefit.description}
                                                    </p>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        ''
                    )}
                </div>
            </div>
        </div>
    );
};
