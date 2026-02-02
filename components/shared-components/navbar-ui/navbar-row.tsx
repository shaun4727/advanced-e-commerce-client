'use client';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { protectedRoutes } from '@/constants';
import { useUser } from '@/context/UserContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { logout } from '@/services/AuthService';
import { CreditCard, LogOut, Menu, X } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

type catItem = {
    _id: string;
    name: string;
    description: string;
    icon: string;
    slug: string;
    // Added fields found in your JSON
    parent?: string | null;
    isActive: boolean;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
};

type childData = {
    title: string;
    category: catItem[];
    type: string;
};

type navItem = {
    _id: string;
    data: childData;
    isOpenNewTab: boolean;
    children: navItem[];
};

export function NavigationRow({ menu }: { menu: navItem[] }) {
    const isMobile = useIsMobile();
    const { user, setIsLoading, setUser, isLoading } = useUser();

    const router = useRouter();
    const pathname = usePathname();

    const dashboardHandler = () => {
        router.push('/dashboard');
    };

    const handleLogout = async () => {
        try {
            const res = await logout();

            if (res === true) {
                setUser(null);
                if (protectedRoutes.some((route) => pathname.match(route))) {
                    router.push('/');
                }
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            {isMobile ? (
                <div className="bg-blue-700 px-2 py-2">
                    <Drawer direction="left">
                        <DrawerTrigger asChild>
                            <Button
                                variant="ghost"
                                className="border border-transparent hover:border-white focus:border-white"
                            >
                                <Menu className="text-white h-5 w-5" />
                            </Button>
                        </DrawerTrigger>

                        <DrawerContent
                            className="h-full w-[70%] max-w-xs rounded-l-none bg-white border-r border-blue-600"
                            showHandle={false}
                        >
                            {/* Close Button */}
                            <DrawerClose asChild>
                                <div className="flex justify-end p-3 border-b border-blue-600/20">
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        className="text-blue-700 hover:bg-blue-600/10"
                                    >
                                        <X className="h-5 w-5" />
                                    </Button>
                                </div>
                            </DrawerClose>

                            <DrawerTitle className="sr-only">
                                Navigation
                            </DrawerTitle>

                            {/* Navigation */}
                            <Accordion
                                type="multiple"
                                className="px-3 py-2 space-y-2"
                            >
                                {/* CATEGORY */}
                                {menu?.map((menuItems) => (
                                    <AccordionItem
                                        key={menuItems._id}
                                        value={menuItems.data.title}
                                        className="border-b border-blue-600/20"
                                    >
                                        <AccordionTrigger
                                            className={`hover:no-underline ${menuItems.children.length === 0 ? '[&>svg]:hidden pointer-events-none' : ''}`}
                                        >
                                            <span className="text-blue-700 font-semibold text-sm">
                                                {menuItems.data.title}
                                            </span>
                                        </AccordionTrigger>

                                        <AccordionContent className="pl-2">
                                            {/* SUB CATEGORY */}
                                            {menuItems.children?.map(
                                                (subItem) => (
                                                    <AccordionItem
                                                        value={
                                                            subItem.data.title
                                                        }
                                                        className="border-none"
                                                    >
                                                        <AccordionTrigger className="py-2 hover:no-underline">
                                                            <span className="text-blue-600 font-medium text-sm">
                                                                {
                                                                    subItem.data
                                                                        .title
                                                                }
                                                            </span>
                                                        </AccordionTrigger>

                                                        <AccordionContent>
                                                            <ul className="ml-3 mt-1 space-y-1">
                                                                {subItem.data.category.map(
                                                                    (
                                                                        cat,
                                                                        i,
                                                                    ) => (
                                                                        <li
                                                                            key={
                                                                                i
                                                                            }
                                                                            className="text-sm text-gray-600 hover:text-blue-700 cursor-pointer"
                                                                        >
                                                                            {
                                                                                cat.name
                                                                            }
                                                                        </li>
                                                                    ),
                                                                )}
                                                            </ul>
                                                        </AccordionContent>
                                                    </AccordionItem>
                                                ),
                                            )}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </DrawerContent>
                    </Drawer>
                </div>
            ) : (
                <div className="bg-blue-600 flex py-3 gap-3 text-white max-w-none justify-between md:px-16">
                    <NavigationMenu>
                        <NavigationMenuList>
                            {menu?.map((item) => {
                                const hasChildren =
                                    item.children && item.children.length > 0;

                                return (
                                    <NavigationMenuItem key={item._id}>
                                        {hasChildren ? (
                                            <>
                                                <NavigationMenuTrigger className="group data-[state=open]:text-black data-[state=open]:bg-blue-500 bg-blue-600 text-white h-9 px-4 py-2 font-medium rounded-md hover:bg-blue-500 focus:bg-blue-500 focus:text-white focus:outline-none transition-colors text-md">
                                                    {item.data.title}
                                                </NavigationMenuTrigger>
                                                <NavigationMenuContent>
                                                    <div className="flex p-4">
                                                        {/* Grid for Sub-categories (Children) */}
                                                        <div className="grid grid-cols-2 gap-4 w-xl p-4">
                                                            {item.children.map(
                                                                (child) => (
                                                                    <div
                                                                        key={
                                                                            child._id
                                                                        }
                                                                    >
                                                                        <h1 className="font-bold text-md border-b border-gray-200 pb-2">
                                                                            {
                                                                                child
                                                                                    .data
                                                                                    .title
                                                                            }
                                                                        </h1>
                                                                        <ul className="pt-2">
                                                                            {child.data.category.map(
                                                                                (
                                                                                    cat,
                                                                                ) => (
                                                                                    <li
                                                                                        key={
                                                                                            cat._id
                                                                                        }
                                                                                        className="text-sm hover:text-blue-600 cursor-pointer"
                                                                                    >
                                                                                        {
                                                                                            cat.name
                                                                                        }
                                                                                    </li>
                                                                                ),
                                                                            )}
                                                                        </ul>
                                                                    </div>
                                                                ),
                                                            )}
                                                        </div>

                                                        {/* Promo Section */}
                                                        <div className="bg-slate-100 w-xs rounded-lg flex items-end p-4">
                                                            <div>
                                                                <h4 className="font-semibold text-lg text-black">
                                                                    New
                                                                    Collection
                                                                </h4>
                                                                <p className="text-sm text-gray-600">
                                                                    Discover the
                                                                    latest
                                                                    trends
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </NavigationMenuContent>
                                            </>
                                        ) : (
                                            <Button className="cursor-pointer bg-blue-600 text-white h-9 px-4 py-2 font-medium rounded-md hover:bg-blue-500 transition-colors text-md shadow-none">
                                                {item.data.title}
                                            </Button>
                                        )}
                                    </NavigationMenuItem>
                                );
                            })}
                        </NavigationMenuList>
                    </NavigationMenu>
                    {user && (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Avatar>
                                    <AvatarImage
                                        src="https://github.com/shadcn.png"
                                        alt="@shadcn"
                                    />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56 mt-2">
                                <DropdownMenuLabel>
                                    My Account
                                </DropdownMenuLabel>

                                <DropdownMenuGroup>
                                    <DropdownMenuItem
                                        onClick={dashboardHandler}
                                    >
                                        <CreditCard />
                                        <span>Dashboard</span>
                                        <DropdownMenuShortcut>
                                            ⌘B
                                        </DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>

                                <DropdownMenuGroup>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        className="bg-red-500 text-white cursor-pointer focus:bg-red-600 focus:text-white"
                                        onClick={handleLogout}
                                    >
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Logout</span>
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                    {!user && (
                        <Button
                            onClick={() => router.push('/login')}
                            className="cursor-pointer bg-blue-600 shadow-none text-white b-0 group inline-flex h-9 w-max items-center justify-center rounded-md  px-4 py-2 font-medium transition-colors hover:bg-blue-500 hover:text-white focus:bg-blue-500 focus:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50  group text-md"
                        >
                            Sign In
                        </Button>
                    )}
                </div>
            )}
        </>
    );
}
