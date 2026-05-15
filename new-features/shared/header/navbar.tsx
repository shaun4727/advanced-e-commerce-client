'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Search, ShoppingCart, UserCircle } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useUser } from '@/context/UserContext';
import { CartDrawer } from '@/new-features/modules/checkout-feature/cart';
import { getNavigationMenuApi } from '@/services/NavmenuService';
import { navItem } from '@/types/new-navItems';
import { toast } from 'sonner';
import { SearchOverlayContent } from './components/search-overlay-content';
import { MegaNavigationMenu } from './mega-menu';
import { MobileMenu } from './mobile-menu';

export default function MainNavbar() {
    const headerRef = useRef(null);
    const [navigationMenu, setNavigationMenu] = useState<navItem[]>([]);
    const { setIsLoading } = useUser();

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

    useEffect(() => {
        const getNavigationMenuMethod = async () => {
            try {
                const res = await getNavigationMenuApi();

                if (res.success) {
                    setNavigationMenu(res.data?.[0]?.items);
                } else {
                    toast.error(res?.message);
                }
            } catch (err) {
                console.log(err);
            }
        };
        setIsLoading(true);
        getNavigationMenuMethod();
    }, []);

    const handleNavigation = (item: navItem) => {
        if (item.data.title === 'Home') {
            return '/';
        } else {
            const catId = item.data.category.length
                ? item.data.category[0]._id
                : '';

            return `/products?category=${catId}`;
        }
    };

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
                    EMART
                </Link>

                {/*Larger Screen Navigation Items */}
                <div className="hidden lg:flex items-center gap-8">
                    {navigationMenu.map((navItem) => {
                        if (!navItem.children.length) {
                            return (
                                <Link
                                    href={handleNavigation(navItem)}
                                    className="nav-link text-xs font-bold uppercase tracking-tight hover:text-primary"
                                >
                                    {navItem.data.title}
                                </Link>
                            );
                        } else {
                            return <MegaNavigationMenu megaMenu={navItem} />;
                        }
                    })}
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

                    <div className="md:hidden">
                        <MobileMenu navigationMenu={navigationMenu} />
                    </div>
                </div>
            </nav>
        </header>
    );
}
