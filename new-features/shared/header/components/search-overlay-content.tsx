'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';
import { getAllProducts } from '@/services/ProductServices';
import { productsWithId } from '@/types';
import { Suspense, useEffect, useState, useTransition } from 'react';
import { SearchResultsSkeleton } from './search-skeleton';
import { ProductSearchResults } from './searched-products';

export function SearchOverlayContent() {
    const [query, setQuery] = useState<string>('');
    const [isPending, startTransition] = useTransition();
    const [productList, setProductList] = useState<productsWithId[]>([]);

    useEffect(() => {
        if (!query.length) {
            setProductList([]);
        }

        const getSearchResult = async () => {
            try {
                // Wrap the string in an object.
                // Note: Change "searchTerm" to whatever key your API actually expects (e.g., "q", "search", or "query")
                const queryParams = { searchTerm: query };

                const { data: products, meta } = await getAllProducts(
                    undefined,
                    undefined,
                    queryParams,
                );

                setProductList(products);
            } catch (err) {
                console.log(err);
            }
        };

        startTransition(() => {
            if (query) {
                getSearchResult();
            }
        });
        // Only run this if the query isn't empty, otherwise it searches on mount
    }, [query]); // Make sure to add 'query' to the dependency array!

    const clearQueryResult = () => {
        setQuery('');
    };

    return (
        <div className="flex flex-col h-full py-6">
            <SheetHeader className="mb-8">
                <div className="flex items-center justify-between">
                    {/* FIX: "aa" must be inside SheetTitle for accessibility. 
             If you want it hidden, use the VisuallyHidden component.
          */}
                    <SheetTitle className="text-4xl font-bold tracking-tighter">
                        Search Page
                    </SheetTitle>
                </div>

                {/* FIX: Description is also required for full accessibility */}
                <SheetDescription className="sr-only">
                    Search our product catalog for electronics, watches, and
                    more.
                </SheetDescription>
            </SheetHeader>

            <div className="relative py-3 border-b border-foreground">
                <Input
                    className="border-none bg-transparent px-3 py-8 font-bold focus-visible:ring-0 placeholder:text-muted-foreground/30"
                    placeholder="Search items..."
                    autoFocus
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <Button
                    variant="link"
                    onClick={clearQueryResult}
                    className="uppercase absolute top-7 right-0 text-xs font-bold tracking-widest text-muted-foreground"
                >
                    Clear
                </Button>
            </div>
            <div
                className="flex-1 flex flex-col items-stretch overflow-y-auto
    [&::-webkit-scrollbar]:w-1.5
    [&::-webkit-scrollbar-track]:bg-transparent
    [&::-webkit-scrollbar-thumb]:rounded-full
    [&::-webkit-scrollbar-thumb]:bg-muted-foreground/20
    hover:[&::-webkit-scrollbar-thumb]:bg-muted-foreground/40
    [&::-webkit-scrollbar-button]:hidden
    [scrollbar-width:thin] 
"
            >
                {/* We move the centering logic specifically to the text. 
        This prevents 'justify-center' on the parent from clipping 
        the top of the skeleton when you scroll.
    */}
                {!productList.length && (
                    <div className="flex justify-center pb-8 pt-4">
                        <p className="text-lg font-medium opacity-60 italic text-center">
                            No Results Could Be Found.
                        </p>
                    </div>
                )}

                <div className="px-1 pb-5">
                    <ProductSearchResults products={productList} />
                    <Suspense fallback={<SearchResultsSkeleton />}>
                        <ProductSearchResults products={productList} />
                    </Suspense>
                </div>
            </div>
        </div>
    );
}
