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
import Link from 'next/link';
import React, { useRef, useState } from 'react';

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { navItem } from '@/types/new-navItems';

// --- Static Bottom Links (Unchanged) ---
const bottomLinks = [
    { name: 'Account', color: 'text-gray-800', href: '/account' },
    { name: 'Rewards', color: 'text-gray-800', href: '/rewards' },
    { name: 'Sale', color: 'text-red-600 font-bold', href: '/sale' },
];

export function MobileMenu({ navigationMenu }: { navigationMenu: navItem[] }) {
    const [isOpen, setIsOpen] = useState(false);
    // Track the fully dynamic active item instead of a hardcoded string
    const [activeMenu, setActiveMenu] = useState<navItem | null>(null);
    const sliderRef = useRef<HTMLDivElement>(null);

    // GSAP: Handle sliding between main menu and dynamic sub-menu
    useGSAP(() => {
        if (!sliderRef.current) return;

        gsap.to(sliderRef.current, {
            // Slide to -50% if a sub-menu is selected
            x: activeMenu ? '-50%' : '0%',
            duration: 0.4,
            ease: 'power3.out',
        });
    }, [activeMenu]);

    // Reset to main panel when menu closes to avoid layout jumps on next open
    const handleOpenChange = (open: boolean) => {
        setIsOpen(open);
        if (!open) {
            setTimeout(() => setActiveMenu(null), 300);
        }
    };

    // Helper for navigation fallback (matches your desktop logic)
    const handleNavigation = (item: navItem) => {
        // Adjust this fallback based on your actual routing logic
        return `/products?category=${item.data.category?.[0]?._id || ''}`;
    };

    return (
        <Sheet open={isOpen} onOpenChange={handleOpenChange}>
            <SheetTrigger asChild>
                <button className="p-1 hover:bg-gray-100 rounded-md transition-colors">
                    <Menu className="size-6" />
                    <span className="sr-only">Open Menu</span>
                </button>
            </SheetTrigger>

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
                        {/* --- PANEL 1: DYNAMIC MAIN MENU --- */}
                        <div className="w-1/2 h-full overflow-y-auto pb-20">
                            <div className="px-6 space-y-6">
                                <ul className="flex flex-col">
                                    {navigationMenu.map((link) => {
                                        const hasSub =
                                            link.children &&
                                            link.children.length > 0;

                                        return (
                                            <li
                                                key={link._id}
                                                className="border-b border-gray-200 last:border-0"
                                            >
                                                {hasSub ? (
                                                    // Trigger Panel 2
                                                    <button
                                                        onClick={() =>
                                                            setActiveMenu(link)
                                                        }
                                                        className="w-full flex items-center justify-between py-5 text-sm font-black tracking-widest uppercase hover:text-primary transition-colors"
                                                    >
                                                        {link.data.title}
                                                        <ChevronRight className="size-5 text-gray-400" />
                                                    </button>
                                                ) : (
                                                    // Direct Link (Closes Sheet)
                                                    <SheetClose asChild>
                                                        <Link
                                                            href={handleNavigation(
                                                                link,
                                                            )}
                                                            className="w-full flex items-center justify-between py-5 text-sm font-black tracking-widest uppercase hover:text-primary transition-colors"
                                                        >
                                                            {link.data.title}
                                                        </Link>
                                                    </SheetClose>
                                                )}
                                            </li>
                                        );
                                    })}
                                </ul>

                                {/* Social Icons */}
                                <div className="flex items-center gap-6 pt-4 text-black">
                                    <Youtube className="size-5" />
                                    <span className="font-bold text-lg leading-none cursor-pointer">
                                        P
                                    </span>
                                    <Twitter className="size-5" />
                                    <Instagram className="size-5" />
                                    <Facebook className="size-5" />
                                    <span className="font-bold text-lg leading-none cursor-pointer">
                                        t
                                    </span>
                                </div>

                                {/* Bottom Links */}
                                <ul className="flex flex-col space-y-5 pt-8">
                                    {bottomLinks.map((link) => (
                                        <li key={link.name}>
                                            <SheetClose asChild>
                                                <Link
                                                    href={link.href}
                                                    className={cn(
                                                        'text-sm transition-colors',
                                                        link.color,
                                                    )}
                                                >
                                                    {link.name}
                                                </Link>
                                            </SheetClose>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* --- PANEL 2: DYNAMIC SUB-MENU --- */}
                        <div className="w-1/2 h-full overflow-y-auto pb-20">
                            <div className="px-6">
                                {/* Back Button */}
                                <button
                                    onClick={() => setActiveMenu(null)}
                                    className="flex items-center gap-2 py-4 mb-2 text-sm font-black tracking-widest uppercase hover:text-primary transition-colors"
                                >
                                    <ChevronLeft className="size-4" />
                                    {activeMenu?.data.title || 'BACK'}
                                </button>

                                {/* Dynamic Sub-Category List */}
                                <ul className="flex flex-col mb-8">
                                    {activeMenu?.children.map((child) => (
                                        <React.Fragment key={child._id}>
                                            {/* Sub-Menu Group Title (e.g. "Shirts & Hoodies") */}
                                            <li className="pt-4 pb-2 border-b border-gray-100">
                                                <span className="text-[13px] font-bold text-black uppercase">
                                                    {child.data.title}
                                                </span>
                                            </li>

                                            {/* Sub-Menu Links (mapped from category array) */}
                                            {child.data.category?.map((cat) => (
                                                <li
                                                    key={cat._id}
                                                    className="py-2.5 border-b border-gray-50 last:border-0"
                                                >
                                                    <SheetClose asChild>
                                                        <Link
                                                            href={`/products?category=${cat._id}`}
                                                            className="flex items-center justify-between text-[13px] text-gray-600 font-medium hover:text-primary transition-colors"
                                                        >
                                                            {cat.name}
                                                        </Link>
                                                    </SheetClose>
                                                </li>
                                            ))}
                                        </React.Fragment>
                                    ))}
                                </ul>

                                {/* Static Promo Cards (Unchanged Design) */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-3 group cursor-pointer">
                                        <div className="bg-[#F5F5F5] aspect-square relative overflow-hidden flex items-center justify-center p-2">
                                            <Image
                                                src="https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=300"
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

                                    <div className="flex flex-col gap-3 group cursor-pointer">
                                        <div className="bg-black aspect-square relative overflow-hidden flex flex-col justify-end p-4">
                                            <Image
                                                src="https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=300"
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
