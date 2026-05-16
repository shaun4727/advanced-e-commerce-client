'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import {
    ChevronLeft,
    ChevronRight,
    Facebook,
    Instagram,
    Menu,
    Twitter,
    X,
    Youtube,
} from 'lucide-react';
import Image from 'next/image';
import { useRef, useState } from 'react';

import {
    Sheet,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { navItem } from '@/types/new-navItems';

// --- Mock Data ---
const mainLinks = [
    { name: 'MEN', hasSub: true },
    { name: 'WOMEN', hasSub: true },
    { name: 'GEAR', hasSub: true },
    { name: 'WORKWEAR SYSTEM', hasSub: true },
    { name: 'MISSION', hasSub: true },
];

const bottomLinks = [
    { name: 'Account', color: 'text-gray-800' },
    { name: 'Rewards', color: 'text-gray-800' },
    { name: 'Sale', color: 'text-red-600 font-bold' },
];

const menSubCategories = [
    { name: 'Featured', isBold: true, hasChevron: true },
    { name: 'Pants & Shorts' },
    { name: 'Shirts & Hoodies' },
    { name: 'Jackets & Vests' },
    { name: 'Bibs & Overalls' },
    { name: 'Hi Vis & PPE' },
    { name: "Shop All Men's Apparel" },
];

export function MobileMenu({ navigationMenu }: { navigationMenu: navItem[] }) {
    const [isOpen, setIsOpen] = useState(false);
    const [activePanel, setActivePanel] = useState<'main' | 'men'>('main');
    const sliderRef = useRef<HTMLDivElement>(null);

    // GSAP: Handle sliding between main menu and sub-menu
    useGSAP(() => {
        if (!sliderRef.current) return;

        gsap.to(sliderRef.current, {
            x: activePanel === 'main' ? '0%' : '-50%',
            duration: 0.4,
            ease: 'power3.out',
        });
    }, [activePanel]);

    // Reset to main panel when menu closes
    const handleOpenChange = (open: boolean) => {
        setIsOpen(open);
        if (!open) {
            setTimeout(() => setActivePanel('main'), 300); // Wait for sheet to close before resetting
        }
    };

    return (
        <Sheet open={isOpen} onOpenChange={handleOpenChange}>
            <SheetTrigger asChild>
                <button className="p-1 hover:bg-gray-100 rounded-md transition-colors">
                    <Menu className="size-6" />
                    <span className="sr-only">Open Menu</span>
                </button>
            </SheetTrigger>

            {/* SheetContent: Full width on mobile, no borders, white background.
              hide close button natively to use custom one.
            */}
            <SheetContent
                side="left"
                className="w-full sm:max-w-none p-0 border-none bg-white [&>button]:hidden flex flex-col"
            >
                <SheetTitle className="sr-only">
                    Mobile Navigation Menu
                </SheetTitle>

                {/* Custom Fixed Close Button */}
                <div className="absolute top-4 left-4 z-50">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="flex items-center justify-center size-10 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                    >
                        <X className="size-5 text-black" />
                    </button>
                </div>

                {/* Sliding Container (200% width holds 2 panels side-by-side) */}
                <div className="flex-1 overflow-hidden relative mt-16">
                    <div
                        ref={sliderRef}
                        className="flex w-[200%] h-full will-change-transform"
                    >
                        {/* --- PANEL 1: MAIN MENU --- */}
                        <div className="w-1/2 h-full overflow-y-auto pb-20">
                            <div className="px-6 space-y-6">
                                {/* Main Navigation Links */}
                                <ul className="flex flex-col">
                                    {mainLinks.map((link) => (
                                        <li
                                            key={link.name}
                                            className="border-b border-gray-200 last:border-0"
                                        >
                                            <button
                                                onClick={() =>
                                                    link.hasSub &&
                                                    setActivePanel('men')
                                                }
                                                className="w-full flex items-center justify-between py-5 text-sm font-black tracking-widest uppercase hover:text-primary transition-colors"
                                            >
                                                {link.name}
                                                {link.hasSub && (
                                                    <ChevronRight className="size-5 text-gray-400" />
                                                )}
                                            </button>
                                        </li>
                                    ))}
                                </ul>

                                {/* Social Icons */}
                                <div className="flex items-center gap-6 pt-4 text-black">
                                    <Youtube className="size-5" />
                                    <span className="font-bold text-lg leading-none cursor-pointer">
                                        P
                                    </span>{' '}
                                    {/* Pinterest mock */}
                                    <Twitter className="size-5" />
                                    <Instagram className="size-5" />
                                    <Facebook className="size-5" />
                                    <span className="font-bold text-lg leading-none cursor-pointer">
                                        t
                                    </span>{' '}
                                    {/* TikTok mock */}
                                </div>

                                {/* Bottom Links */}
                                <ul className="flex flex-col space-y-5 pt-8">
                                    {bottomLinks.map((link) => (
                                        <li key={link.name}>
                                            <a
                                                href="#"
                                                className={cn(
                                                    'text-sm transition-colors',
                                                    link.color,
                                                )}
                                            >
                                                {link.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* --- PANEL 2: MEN SUB-MENU --- */}
                        <div className="w-1/2 h-full overflow-y-auto pb-20">
                            <div className="px-6">
                                {/* Back Button */}
                                <button
                                    onClick={() => setActivePanel('main')}
                                    className="flex items-center gap-2 py-4 mb-2 text-sm font-black tracking-widest uppercase hover:text-primary transition-colors"
                                >
                                    <ChevronLeft className="size-4" />
                                    MEN
                                </button>

                                {/* Sub-Category List */}
                                <ul className="flex flex-col space-y-4 mb-8">
                                    {menSubCategories.map((cat, idx) => (
                                        <li key={idx}>
                                            <a
                                                href="#"
                                                className={cn(
                                                    'flex items-center justify-between text-[13px] hover:text-primary transition-colors',
                                                    cat.isBold
                                                        ? 'font-bold text-black'
                                                        : 'text-gray-600 font-medium',
                                                    cat.name.includes(
                                                        'Shop All',
                                                    ) && 'pt-4', // Add spacing before "Shop All"
                                                )}
                                            >
                                                {cat.name}
                                                {cat.hasChevron && (
                                                    <ChevronRight className="size-4 text-black" />
                                                )}
                                            </a>
                                        </li>
                                    ))}
                                </ul>

                                {/* Promo Cards */}
                                <div className="grid grid-cols-2 gap-4">
                                    {/* Promo 1 */}
                                    <div className="flex flex-col gap-3 group cursor-pointer">
                                        <div className="bg-[#F5F5F5] aspect-square relative overflow-hidden flex items-center justify-center p-2">
                                            <Image
                                                src="https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=300" // Pants placeholder
                                                alt="Work Pants"
                                                fill
                                                className="object-cover mix-blend-multiply transition-transform group-hover:scale-105"
                                            />
                                        </div>
                                        <p className="text-[10px] font-black uppercase tracking-widest leading-tight">
                                            Technical
                                            <br />
                                            Work Pants
                                        </p>
                                    </div>

                                    {/* Promo 2 */}
                                    <div className="flex flex-col gap-3 group cursor-pointer">
                                        <div className="bg-black aspect-square relative overflow-hidden flex flex-col justify-end p-4">
                                            <Image
                                                src="https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=300" // Shorts placeholder
                                                alt="Shorts"
                                                fill
                                                className="object-cover opacity-40 transition-transform group-hover:scale-105"
                                            />
                                            <div className="relative z-10">
                                                <p className="text-[8px] font-bold text-yellow-400 uppercase tracking-widest mb-1">
                                                    Shorts For Summer
                                                </p>
                                                <h4 className="text-white text-xl font-black uppercase leading-none">
                                                    Buy One Get One{' '}
                                                    <span className="text-yellow-400">
                                                        30% Off
                                                    </span>
                                                </h4>
                                            </div>
                                        </div>
                                        <p className="text-[10px] font-black uppercase tracking-widest leading-tight">
                                            Bogo 30% Off Shorts
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
