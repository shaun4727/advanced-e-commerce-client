'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { addProduct } from '@/redux/features/cartSlice';
import { useAppDispatch } from '@/redux/hooks';
import { IProduct } from '@/types';
import Link from 'next/link';
import { toast } from 'sonner';

// --- Types ---
export interface Product {
    id: string;
    name: string;
    price: number;
    rating: number;
    tag?: string;
    promo?: string;
    image: string;
    colors: string[]; // hex codes
    extraColorsCount?: number;
}

interface ProductSliderProps {
    products: IProduct[];
    title?: string;
}

export function ProductSlider({ products }: ProductSliderProps) {
    const sliderRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerView, setItemsPerView] = useState(4); // Default desktop

    // --- Touch Swipe State ---
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    const minSwipeDistance = 50; // Minimum distance (px) required to trigger a swipe

    // Handle responsive items per view
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setItemsPerView(1); // Mobile: 1 item
            } else if (window.innerWidth < 1024) {
                setItemsPerView(2); // Tablet: 2 items
            } else {
                setItemsPerView(4); // Desktop: 4 items (as per image)
            }
        };

        handleResize(); // Initial check
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const dispatch = useAppDispatch();
    const handleAddProduct = (
        product: IProduct,
        e: React.MouseEvent<HTMLButtonElement>,
    ) => {
        e.stopPropagation();
        dispatch(addProduct(product));
        toast.success('Product added to cart', { id: 1 });
    };

    const maxIndex = Math.max(0, products.length - itemsPerView);
    const progressPercentage =
        maxIndex > 0 ? (currentIndex / maxIndex) * 100 : 100;

    // GSAP Animation for Slider and Progress Bar
    useGSAP(() => {
        // 1. Move the slider track
        gsap.to(trackRef.current, {
            x: `-${currentIndex * (100 / itemsPerView)}%`,
            duration: 0.6,
            ease: 'power3.out',
        });

        // 2. Scale the progress bar indicator
        gsap.to(progressBarRef.current, {
            width: `${progressPercentage}%`,
            duration: 0.6,
            ease: 'power3.out',
        });
    }, [currentIndex, itemsPerView]);

    // Navigation Handlers
    const handleNext = () => {
        setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
    };

    // --- Touch Event Handlers ---
    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null); // Reset touch end
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            handleNext();
        } else if (isRightSwipe) {
            handlePrev();
        }
    };

    return (
        <div
            className="w-full flex flex-col space-y-10 py-10 overflow-hidden"
            ref={sliderRef}
        >
            {/* Track Container (Height of screen logic applied here) */}
            <div
                className="relative w-full h-[75vh] md:h-[55vh]"
                // Attach touch listeners to the wrapper
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
            >
                <div
                    ref={trackRef}
                    className="flex h-full w-full will-change-transform"
                >
                    {products.map((product, index) => (
                        <div
                            key={index}
                            // Width dictates items per view (100% on mobile, 50% md, 25% lg)
                            className="relative flex-shrink-0 w-full md:w-1/2 lg:w-1/4 h-full px-2 lg:px-4 group"
                        >
                            <div className="w-full h-full flex flex-col">
                                {/* Image & Quick Add Area */}
                                <div className="relative flex-1 bg-[#F9F8F6] overflow-hidden mb-4 flex items-center justify-center pointer-events-none md:pointer-events-auto">
                                    <Image
                                        src={
                                            product.imageUrls?.[0] ||
                                            '/placeholder-image.png'
                                        }
                                        alt={product.name || 'Product Image'}
                                        fill
                                        className="object-cover object-center mix-blend-multiply p-6"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                    />
                                    {/* Quick Add Button (Visible on Hover) */}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/5 pointer-events-auto">
                                        <div className="flex flex-col gap-2">
                                            <Button
                                                onClick={(e) =>
                                                    handleAddProduct(product, e)
                                                }
                                                variant="secondary"
                                                className="bg-white cursor-pointer text-black hover:bg-gray-100 uppercase font-bold tracking-widest text-xs rounded-none shadow-xl border border-gray-200"
                                            >
                                                + Quick Add
                                            </Button>
                                            <Link
                                                href={`/product-detail/${product._id}`}
                                                className="inline-flex items-center justify-center whitespace-nowrap bg-white text-black hover:bg-gray-100 uppercase font-bold tracking-widest text-xs rounded-none shadow-xl border border-gray-200 h-9 px-4 py-2 transition-colors"
                                            >
                                                View Detail
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                {/* Product Details Area */}
                                <div className="space-y-2.5 pointer-events-none md:pointer-events-auto">
                                    {/* Swatches */}

                                    {/* Tags & Rating */}
                                    <div className="flex items-center justify-between">
                                        <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">
                                            {typeof product.category ===
                                            'string'
                                                ? product.category
                                                : product.category?.name || ' '}
                                        </p>
                                        <div className="flex items-center gap-1 text-[10px] font-bold">
                                            {product.ratingCount?.toFixed(1)}{' '}
                                            <Star className="size-3 fill-black text-black" />
                                        </div>
                                    </div>

                                    {/* Title & Price */}
                                    <div>
                                        <h3 className="font-bold text-sm uppercase leading-tight">
                                            {product.name}
                                        </h3>
                                        <p className="text-sm text-muted-foreground font-medium">
                                            ${product.price.toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Controls & Progress Bar Area */}
            <div className="container mx-auto px-4 flex items-center justify-between gap-8 pt-4">
                {/* Custom Progress Bar */}
                <div className="flex-1 h-[2px] bg-gray-200 relative">
                    <div
                        ref={progressBarRef}
                        className="absolute left-0 top-0 h-full bg-black min-w-[20%]" // min-w ensures it's never invisible
                    />
                </div>

                {/* Navigation Arrows (Hidden on Mobile) */}
                <div className="hidden md:flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={handlePrev}
                        disabled={currentIndex === 0}
                        className="rounded-none size-10 border-gray-300 hover:border-black disabled:opacity-30 transition-colors"
                    >
                        <ChevronLeft className="size-5" />
                        <span className="sr-only">Previous</span>
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={handleNext}
                        disabled={currentIndex === maxIndex}
                        className="rounded-none size-10 border-gray-300 hover:border-black disabled:opacity-30 transition-colors"
                    >
                        <ChevronRight className="size-5" />
                        <span className="sr-only">Next</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}
