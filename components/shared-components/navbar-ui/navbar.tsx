'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { NavigationRow } from './navbar-row';

export const NavBar = () => {
    return (
        <header className="z-30">
            <div className="bg-blue-700 flex flex-col justify-center items-center gap-2 py-2 md:flex-row md:gap-4 md:justify-between px-16  overflow-hidden">
                <div className="">
                    <h1 className="text-xl font-bold text-yellow-400">Emart</h1>
                </div>

                <div className="md:w-1/2">
                    <div className="flex md:w-full">
                        {' '}
                        {/* consistent height for all children */}
                        <Input
                            placeholder="Search here..."
                            onBlur={() => {}}
                            className="bg-white rounded-r-none basis-64 md:flex-1"
                        />
                        <Button
                            onClick={() => {}}
                            className="rounded-l-none bg-yellow-500 hover:bg-yellow-600 text-black"
                            aria-label="Search"
                        >
                            <Search className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <div className=" ">
                    <Link
                        href="/cart"
                        className="flex items-center p-2 flex-row gap-2"
                    >
                        {' '}
                        <div className="relative w-8 h-8">
                            <ShoppingCart className="h-7 w-7 text-white" />
                            <div className="absolute top-0 right-0 bg-yellow-500 text-black rounded-full w-3 h-3 flex items-center justify-center text-xs md:p-2">
                                4
                            </div>
                        </div>
                        <span className="md:font-semibold text-white flex items-center">
                            BDT {Number(200).toFixed(2)}
                        </span>
                    </Link>
                </div>
            </div>

            <NavigationRow />
        </header>
    );
};
