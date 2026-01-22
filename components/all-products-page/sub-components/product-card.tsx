'use client';

import { StartRating } from '@/components/home-page/product-components/star-component';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

export const ProductCard = ({
    index,
    viewMode,
}: {
    index: number;
    viewMode: 'grid' | 'list';
}) => {
    return (
        <Card
            key={index}
            className="hover:shadow-lg transition-shadow duration-200 cursor-pointer overflow-hidden"
        >
            <CardContent
                className={
                    viewMode === 'grid'
                        ? 'p-0 flex flex-col h-full' // Grid: Stack vertically
                        : 'p-4 flex flex-row gap-4' // List: Side-by-side
                }
            >
                {/* --- Image Container --- */}
                <div
                    className={
                        viewMode === 'grid'
                            ? 'w-full aspect-square relative bg-gray-100 h-62' // Large image for grid
                            : 'w-24 h-24 sm:w-32 sm:h-32 shrink-0 relative bg-gray-100 rounded-md overflow-hidden' // Smaller for list
                    }
                >
                    <Image
                        src={'/no-image'}
                        alt="product-img"
                        fill
                        className="object-cover"
                    />
                </div>

                {/* --- Info Container --- */}
                <div
                    className={`flex flex-col flex-1 ${viewMode === 'grid' ? 'p-4' : ''}`}
                >
                    <div className="flex-1">
                        {' '}
                        {/* This div pushes the button down */}
                        <h3 className="font-semibold text-gray-900 line-clamp-1">
                            Product Name
                        </h3>
                        <p className="text-xs text-gray-500 mb-2">Brand Name</p>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-lg font-bold text-blue-600">
                                BDT {Number(0).toFixed(2)}
                            </span>
                            <span className="text-sm text-gray-400 line-through">
                                BDT {Number(0).toFixed(2)}
                            </span>
                        </div>
                        <div className="mb-4">
                            <StartRating rating={3} reviewCount={0} />
                            <p className="text-sm text-gray-500 mt-2 line-clamp-2 md:line-clamp-3">
                                This line should be description of product.
                                Current database is not integrated so product
                                description is unavailable.
                            </p>
                        </div>
                    </div>

                    {/* --- Button: No longer absolute --- */}
                    <Button
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent card click
                        }}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-auto"
                    >
                        Add to Cart
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};
