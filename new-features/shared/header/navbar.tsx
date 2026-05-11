'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Search, ShoppingCart, UserCircle, X } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { CartDrawer } from '@/new-features/modules/checkout-feature/cart';
import { MegaNavigationMenu } from './mega-menu';

export default function MainNavbar() {
    const headerRef = useRef(null);

    useGSAP(
        () => {
            gsap.from('.nav-link', {
                opacity: 0,
                y: -10,
                stagger: 0.1,
                duration: 0.5,
                ease: 'power2.out',
            });
        },
        { scope: headerRef },
    );

    return (
        <header
            ref={headerRef}
            className="sticky top-0 z-50 w-full border-b border-border bg-background"
        >
            {/* Announcement Bar */}
            <div className="bg-primary font-smooch py-1.5 text-center text-[14px] font-bold uppercase tracking-widest text-primary-foreground">
                BOGO 30% OFF T1 + CLOUD SHORTS
            </div>

            <nav className="mx-auto flex h-16 max-w-7xl  items-center justify-between px-6">
                {/* Logo */}
                <Link
                    href="/"
                    className="text-2xl font-black tracking-tighter text-foreground uppercase"
                >
                    Truewerk
                </Link>

                {/* Navigation Items */}
                <div className="hidden lg:flex items-center gap-8">
                    <Link
                        href="/"
                        className="nav-link text-xs font-bold uppercase tracking-tight hover:text-primary"
                    >
                        Home
                    </Link>
                    <MegaNavigationMenu />
                    <Link
                        href="/fruits"
                        className="nav-link text-xs font-bold uppercase tracking-tight hover:text-primary"
                    >
                        Fruits & Vegetables
                    </Link>
                    <Link
                        href="/watches"
                        className="nav-link text-xs font-bold uppercase tracking-tight hover:text-primary"
                    >
                        Watches
                    </Link>
                </div>

                {/* Action Icons */}
                <div className="flex items-center gap-4">
                    <Link
                        href="/rewards"
                        className="hidden md:block text-xs font-medium text-muted-foreground hover:text-primary"
                    >
                        Rewards
                    </Link>

                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="hover:bg-accent transition-colors"
                            >
                                <Search className="size-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent
                            side="right"
                            className="w-full sm:max-w-xl bg-popover"
                        >
                            <SearchOverlayContent />
                        </SheetContent>
                    </Sheet>

                    <Button variant="ghost" size="icon">
                        <UserCircle className="size-5" />
                    </Button>

                    <CartDrawer>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="relative"
                        >
                            <ShoppingCart className="size-5" />
                            <span className="absolute top-1 right-1 flex size-3 items-center justify-center rounded-full bg-primary text-[8px] text-white">
                                0
                            </span>
                        </Button>
                    </CartDrawer>
                </div>
            </nav>
        </header>
    );
}

function SearchOverlayContent() {
    return (
        <div className="flex flex-col h-full py-6">
            <SheetHeader className="mb-8">
                <div className="flex items-center justify-between">
                    {/* FIX: "aa" must be inside SheetTitle for accessibility. 
             If you want it hidden, use the VisuallyHidden component.
          */}
                    <SheetTitle className="text-4xl font-bold tracking-tighter">
                        aa
                    </SheetTitle>

                    <div className="flex items-center gap-4">
                        <Button
                            variant="link"
                            className="uppercase text-xs font-bold tracking-widest text-muted-foreground"
                        >
                            Clear
                        </Button>
                        <SheetClose className="p-2 hover:bg-accent rounded-full transition-colors">
                            <X className="size-6" />
                        </SheetClose>
                    </div>
                </div>

                {/* FIX: Description is also required for full accessibility */}
                <SheetDescription className="sr-only">
                    Search our product catalog for electronics, watches, and
                    more.
                </SheetDescription>
            </SheetHeader>

            <div className="relative border-b border-foreground">
                <Input
                    className="border-none bg-transparent px-0 py-8 text-2xl focus-visible:ring-0 placeholder:text-muted-foreground/30"
                    placeholder="Search items..."
                    autoFocus
                />
            </div>

            <div className="flex-1 flex flex-col items-center justify-center text-center">
                <p className="text-lg font-medium opacity-60 italic">
                    No Results Could Be Found.
                </p>
            </div>
        </div>
    );
}
