'use client';

import { Search, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { NavigationRow } from './navbar-row';

export const NavBar = () => {
    return (
        <header>
            <div className="bg-blue-700 flex justify-center items-center gap-4 py-4">
                <div className="flex items-center">
                    <h1 className="text-md md:text-2xl md:font-bold text-yellow-400 ">
                        Emart
                    </h1>
                </div>

                <div className="flex-1 max-w-2xl mx-8">
                    <div className="flex h-11">
                        {' '}
                        {/* consistent height for all children */}
                        <Input
                            placeholder="Search here..."
                            onBlur={() => {}}
                            // className="flex-1 bg-white border-r border-gray-300 rounded-none h-full focus-visible:ring-0"
                            className="bg-white h-full rounded-r-none text-black"
                        />
                        <Button
                            onClick={() => {}}
                            className=" bg-yellow-500 hover:bg-yellow-600 text-black rounded-l-none md:px-6 h-full md:btn-default"
                            aria-label="Search"
                        >
                            <Search className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <div className="flex md:items-center md:space-x-2 bg-blue-600 md:flex-row md:px-4 md:py-2 rounded cursor-pointer">
                    <Link
                        href="/cart"
                        className="flex flex-col items-center gap-0.5 p-2 md:flex-row md:gap-2"
                    >
                        {' '}
                        <div className="relative w-8 h-8">
                            <ShoppingCart className="md:h-7 md:w-7 text-white" />
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
