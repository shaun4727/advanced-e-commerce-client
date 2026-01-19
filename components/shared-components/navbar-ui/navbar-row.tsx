'use client';

import { Button } from '@/components/ui/button';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { useIsMobile } from '@/hooks/use-mobile';

export function NavigationRow() {
    const isMobile = useIsMobile();

    return (
        <>
            {isMobile ? (
                <p>Mobile page</p>
            ) : (
                <NavigationMenu className="bg-blue-600 flex py-3 gap-3 text-white max-w-none justify-start">
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
