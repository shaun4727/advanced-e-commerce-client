'use client';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { useIsMobile } from '@/hooks/use-mobile';
import { Menu, X } from 'lucide-react';

export function NavigationRow() {
    const isMobile = useIsMobile();

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
                                defaultValue={['electronics']}
                                className="px-3 py-2 space-y-2"
                            >
                                {/* CATEGORY */}
                                <AccordionItem
                                    value="electronics"
                                    className="border-b border-blue-600/20"
                                >
                                    <AccordionTrigger className="hover:no-underline">
                                        <span className="text-blue-700 font-semibold text-sm">
                                            Electronics & Others
                                        </span>
                                    </AccordionTrigger>

                                    <AccordionContent className="pl-2">
                                        {/* SUB CATEGORY */}
                                        <AccordionItem
                                            value="accessories"
                                            className="border-none"
                                        >
                                            <AccordionTrigger className="py-2 hover:no-underline">
                                                <span className="text-blue-600 font-medium text-sm">
                                                    Home Accessories
                                                </span>
                                            </AccordionTrigger>

                                            <AccordionContent>
                                                <ul className="ml-3 mt-1 space-y-1">
                                                    {[
                                                        'Something',
                                                        'Something',
                                                        'Something',
                                                    ].map((item, i) => (
                                                        <li
                                                            key={i}
                                                            className="text-sm text-gray-600 hover:text-blue-700 cursor-pointer"
                                                        >
                                                            {item}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </AccordionContent>
                                </AccordionItem>

                                {/* CATEGORY 2 */}
                                <AccordionItem
                                    value="category-2"
                                    className="border-b border-blue-600/20"
                                >
                                    <AccordionTrigger className="hover:no-underline">
                                        <span className="text-blue-700 font-semibold text-sm">
                                            Category 2
                                        </span>
                                    </AccordionTrigger>

                                    <AccordionContent className="pl-2">
                                        <AccordionItem
                                            value="sub-2"
                                            className="border-none"
                                        >
                                            <AccordionTrigger className="py-2 hover:no-underline">
                                                <span className="text-blue-600 font-medium text-sm">
                                                    Sub Category
                                                </span>
                                            </AccordionTrigger>

                                            <AccordionContent>
                                                <ul className="ml-3 mt-1 space-y-1">
                                                    <li className="text-sm text-gray-600 hover:text-blue-700 cursor-pointer">
                                                        Something
                                                    </li>
                                                    <li className="text-sm text-gray-600 hover:text-blue-700 cursor-pointer">
                                                        Something
                                                    </li>
                                                    <li className="text-sm text-gray-600 hover:text-blue-700 cursor-pointer">
                                                        Something
                                                    </li>
                                                </ul>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </AccordionContent>
                                </AccordionItem>

                                {/* CATEGORY 3 */}
                                <AccordionItem value="category-3">
                                    <AccordionTrigger className="hover:no-underline">
                                        <span className="text-blue-700 font-semibold text-sm">
                                            Category 3
                                        </span>
                                    </AccordionTrigger>

                                    <AccordionContent className="pl-2">
                                        <AccordionItem
                                            value="sub-3"
                                            className="border-none"
                                        >
                                            <AccordionTrigger className="py-2 hover:no-underline">
                                                <span className="text-blue-600 font-medium text-sm">
                                                    Sub Category
                                                </span>
                                            </AccordionTrigger>

                                            <AccordionContent>
                                                <ul className="ml-3 mt-1 space-y-1">
                                                    <li className="text-sm text-gray-600 hover:text-blue-700 cursor-pointer">
                                                        Something
                                                    </li>
                                                    <li className="text-sm text-gray-600 hover:text-blue-700 cursor-pointer">
                                                        Something
                                                    </li>
                                                    <li className="text-sm text-gray-600 hover:text-blue-700 cursor-pointer">
                                                        Something
                                                    </li>
                                                </ul>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </DrawerContent>
                    </Drawer>
                </div>
            ) : (
                <NavigationMenu className="bg-blue-600 flex py-3 gap-3 text-white max-w-none justify-start md:px-16">
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <Button className="bg-blue-600 shadow-none text-white b-0 group inline-flex h-9 w-max items-center justify-center rounded-md  px-4 py-2 font-medium transition-colors hover:bg-blue-500 hover:text-white focus:bg-blue-500 focus:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50  group text-md">
                                Home
                            </Button>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger className="group data-[state=open]:text-white data-[state=open]:bg-blue-500 data-[state=open]:hover:bg-blue-500 data-[state=open]:focus:bg-blue-500 bg-blue-600 shadow-none text-white b-0 group inline-flex h-9 w-max items-center justify-center rounded-md  px-4 py-2 font-medium transition-colors hover:bg-blue-500 hover:text-white focus:bg-blue-500 focus:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50  group text-md">
                                ELectronic & Others
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <div className="flex p-4">
                                    <div className="grid grid-cols-2 grid-rows-2 gap-4 w-xl p-4">
                                        <div>
                                            <h1 className="font-bold text-md border-b border-gray-200 pb-2">
                                                Home Accessories
                                            </h1>
                                            <ul className="pt-2">
                                                <li className="text-sm">
                                                    Bedding
                                                </li>
                                                <li className="text-sm">
                                                    Furniture
                                                </li>
                                                <li className="text-sm">
                                                    Wall Art
                                                </li>
                                                <li className="text-sm">
                                                    Lighting & Ceiling Fans
                                                </li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h1 className="font-bold text-md border-b border-gray-200 pb-2">
                                                Computer
                                            </h1>
                                            <ul className="pt-2">
                                                <li className="text-sm">
                                                    Bedding
                                                </li>
                                                <li className="text-sm">
                                                    Furniture
                                                </li>
                                                <li className="text-sm">
                                                    Wall Art
                                                </li>
                                                <li className="text-sm">
                                                    Lighting & Ceiling Fans
                                                </li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h1 className="font-bold text-md border-b border-gray-200 pb-2">
                                                Mobile Accessories
                                            </h1>
                                            <ul className="pt-2">
                                                <li className="text-sm">
                                                    Bedding
                                                </li>
                                                <li className="text-sm">
                                                    Furniture
                                                </li>
                                                <li className="text-sm">
                                                    Wall Art
                                                </li>
                                                <li className="text-sm">
                                                    Lighting & Ceiling Fans
                                                </li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h1 className="font-bold text-md border-b border-gray-200 pb-2">
                                                Bags & Others
                                            </h1>
                                            <ul className="pt-2">
                                                <li className="text-sm">
                                                    Bedding
                                                </li>
                                                <li className="text-sm">
                                                    Furniture
                                                </li>
                                                <li className="text-sm">
                                                    Wall Art
                                                </li>
                                                <li className="text-sm">
                                                    Lighting & Ceiling Fans
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="inset-0 bg-black bg-opacity-20 w-xs rounded-lg flex items-end">
                                        <div className="p-4 text-white">
                                            <h4 className="font-semibold text-lg">
                                                New Collection
                                            </h4>
                                            <p className="text-sm opacity-90">
                                                Discover the latest trends
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem className="mr-2">
                            <Button className="bg-blue-600 shadow-none text-white b-0 group inline-flex h-9 w-max items-center justify-center rounded-md  px-4 py-2 font-medium transition-colors hover:bg-blue-500 hover:text-white focus:bg-blue-500 focus:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50  group text-md">
                                Fruits and Vegetables
                            </Button>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Button className="bg-blue-600 shadow-none text-white b-0 group inline-flex h-9 w-max items-center justify-center rounded-md  px-4 py-2 font-medium transition-colors hover:bg-blue-500 hover:text-white focus:bg-blue-500 focus:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50  group text-md">
                                Watches
                            </Button>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Button className="bg-blue-600 shadow-none text-white b-0 group inline-flex h-9 w-max items-center justify-center rounded-md  px-4 py-2 font-medium transition-colors hover:bg-blue-500 hover:text-white focus:bg-blue-500 focus:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50  group text-md">
                                Tshirt
                            </Button>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            )}
        </>
    );
}
