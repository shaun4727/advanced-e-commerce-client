'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    grandTotalSelector,
    orderedProductsSelector,
} from '@/redux/features/cartSlice';
import { useAppSelector } from '@/redux/hooks';
import { getNavigationMenuApi } from '@/services/NavmenuService';
import { Search, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { NavigationRow } from './navbar-row';

export const NavBar = () => {
    const [navigationMenu, setNavigationMenu] = useState([]);
    const cartProducts = useAppSelector(orderedProductsSelector);
    const grandTotal = useAppSelector(grandTotalSelector);
    const router = useRouter();
    const [searchValue, setSearchValue] = useState<string>('');

    const getNavigationMenuMethod = async () => {
        try {
            const res = await getNavigationMenuApi();

            if (res.success) {
                setNavigationMenu(res.data?.[0]?.items);
            } else {
                toast.error(res.data.message);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const searchProducts = () => {
        router.push(`/products?searchTerm=${searchValue}`);
    };

    useEffect(() => {
        getNavigationMenuMethod();
    }, []);

    return (
        <header className="sticky top-0 z-30">
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
                            onBlur={(e) => setSearchValue(e.target.value)}
                            className="bg-white rounded-r-none basis-64 md:flex-1"
                        />
                        <Button
                            onClick={searchProducts}
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
                                {cartProducts.length}
                            </div>
                        </div>
                        <span className="md:font-semibold text-white flex items-center">
                            BDT {Number(grandTotal).toFixed(2)}
                        </span>
                    </Link>
                </div>
            </div>

            <NavigationRow menu={navigationMenu} />
        </header>
    );
};
