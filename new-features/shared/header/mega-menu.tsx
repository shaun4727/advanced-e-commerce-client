'use client';

import Link from 'next/link';
import * as React from 'react';

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { catItem, navItem } from '@/types/new-navItems';
import Image from 'next/image';

export function MegaNavigationMenu({ megaMenu }: { megaMenu: navItem }) {
    return (
        <NavigationMenu className="static">
            <NavigationMenuList className="static">
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="uppercase text-xs font-bold">
                        Electronics
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <div className="flex justify-between gap-8 p-10 md:min-w-screen md:min-h-[350px] text-xs uppercase">
                            <div className="flex gap-8">
                                {megaMenu.children &&
                                    megaMenu.children.map((nav) => (
                                        <div key={nav._id}>
                                            <ul>
                                                <li>
                                                    <h1 className="font-extrabold text-lg mb-4">
                                                        {nav.data.title}
                                                    </h1>
                                                </li>
                                                {nav.data.category?.map(
                                                    (subNav: catItem) => (
                                                        <li
                                                            className="mb-1 cursor-pointer"
                                                            key={subNav._id}
                                                        >
                                                            <Link
                                                                href={`/products?category=${subNav._id}`}
                                                            >
                                                                {subNav.name}
                                                            </Link>
                                                        </li>
                                                    ),
                                                )}
                                            </ul>
                                        </div>
                                    ))}
                            </div>
                            <div>
                                <Image
                                    src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=600" // Example watch/tech photo
                                    alt="Featured product"
                                    width="400"
                                    height="600"
                                    className="object-cover w-40 transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                        </div>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
}

function ListItem({
    title,
    children,
    href,
    ...props
}: React.ComponentPropsWithoutRef<'li'> & { href: string }) {
    return (
        <li {...props}>
            <NavigationMenuLink asChild>
                <Link href={href}>
                    <div className="flex flex-col gap-1 text-sm">
                        <div className="leading-none font-medium">{title}</div>
                        <div className="line-clamp-2 text-muted-foreground">
                            {children}
                        </div>
                    </div>
                </Link>
            </NavigationMenuLink>
        </li>
    );
}
