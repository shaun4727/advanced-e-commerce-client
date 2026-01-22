'use client';

import { Grid3X3, List } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { StartRating } from '../home-page/product-components/star-component';
import TablePagination from '../shared-components/pagination/pagination';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Checkbox } from '../ui/checkbox';
import { Separator } from '../ui/separator';
import { Slider } from '../ui/slider';

export const AllProducts = () => {
    const brandProducts = [1, 2, 3, 4, 5, 6, 7];
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    const selectedRating = null;

    return (
        <div>
            <div className="w-full bg-gray-50 py-8">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Sidebar Filters */}
                        <div className="lg:w-1/4">
                            <Card className="sticky top-4">
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-lg font-bold text-gray-900">
                                            SHOP BY
                                        </h3>
                                    </div>

                                    {/* Brand Filters */}
                                    <div className="mb-8">
                                        <h4 className="font-semibold text-gray-900 mb-4">
                                            Brand
                                        </h4>
                                        <div className="space-y-3 overflow-y-auto">
                                            {brandProducts.map((_, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center space-x-3"
                                                >
                                                    <Checkbox
                                                        id="all-products-checkbox"
                                                        // checked={selectedBrands.includes(brand._id)}
                                                        onCheckedChange={() => {}}
                                                        className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                                                    />
                                                    <label
                                                        htmlFor="all-products-checkbox"
                                                        className="flex-1 text-sm text-gray-700 cursor-pointer hover:text-blue-600 transition-colors"
                                                    >
                                                        <div className="flex items-center justify-between">
                                                            <span>
                                                                Brand Name
                                                            </span>
                                                            <span className="text-xs text-gray-500">
                                                                4
                                                            </span>
                                                        </div>
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <Separator className="my-6" />

                                    {/* Rating Filter */}
                                    <div className="mb-8">
                                        <h4 className="font-semibold text-gray-900 mb-4">
                                            Customer Rating
                                        </h4>
                                        <div className="space-y-3">
                                            {[5, 4, 3, 2, 1].map((rating) => (
                                                <div
                                                    key={rating}
                                                    className="flex items-center space-x-3"
                                                >
                                                    <Checkbox
                                                        id={`rating-${rating}`}
                                                        onCheckedChange={() => {}}
                                                        className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                                                    />
                                                    <label
                                                        htmlFor={`rating-${rating}`}
                                                        className="flex-1 cursor-pointer hover:text-blue-600 transition-colors"
                                                    >
                                                        <div className="flex items-center space-x-2">
                                                            <StartRating
                                                                rating={rating}
                                                                reviewCount={0}
                                                            />
                                                            <span className="text-sm text-gray-600">
                                                                & Up
                                                            </span>
                                                        </div>
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <Separator className="my-6" />

                                    {/* Price Slider */}
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-4">
                                            Price Range
                                        </h4>
                                        <div className="space-y-4">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-red-500 font-medium">
                                                    BDT {Number(0).toFixed(2)}
                                                </span>
                                                <span className="text-red-500 font-medium">
                                                    BDT {Number(0).toFixed(2)}
                                                </span>
                                            </div>
                                            <Slider
                                                value={[]}
                                                onValueChange={() => {}}
                                                max={1000}
                                                min={0}
                                                step={10}
                                                className="w-full"
                                            />
                                            <Button
                                                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                                                onClick={() => {}}
                                            >
                                                Apply Filters
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Active Filters Summary */}
                                    {(brandProducts.length > 0 ||
                                        selectedRating !== null) && (
                                        <>
                                            <Separator className="my-6" />
                                            <div>
                                                <h4 className="font-semibold text-gray-900 mb-3">
                                                    Active Filters
                                                </h4>
                                                <div className="space-y-2">
                                                    {brandProducts.map(
                                                        (_, index) => {
                                                            return (
                                                                <div
                                                                    key={index}
                                                                    className="flex items-center justify-between bg-blue-50 px-3 py-1 rounded-full"
                                                                >
                                                                    <span className="text-sm text-blue-700">
                                                                        Brand
                                                                        Name
                                                                    </span>
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="sm"
                                                                        onClick={() => {}}
                                                                        className="h-auto p-1 text-blue-600 hover:text-blue-800"
                                                                    >
                                                                        ×
                                                                    </Button>
                                                                </div>
                                                            );
                                                        },
                                                    )}
                                                    {selectedRating && (
                                                        <div className="flex items-center justify-between bg-blue-50 px-3 py-1 rounded-full">
                                                            <div className="flex items-center space-x-1">
                                                                <StartRating
                                                                    rating={
                                                                        selectedRating
                                                                    }
                                                                    reviewCount={
                                                                        0
                                                                    }
                                                                />
                                                                <span className="text-sm text-blue-700">
                                                                    & Up
                                                                </span>
                                                            </div>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => {}}
                                                                className="h-auto p-1 text-blue-600 hover:text-blue-800"
                                                            >
                                                                ×
                                                            </Button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        {/* Main Content */}
                        <div className="lg:w-3/4">
                            {/* Promotional Banner */}
                            <div className="relative h-64 md:h-80 mb-8 rounded-lg overflow-hidden">
                                <Image
                                    src="/images/big-sale.jpg"
                                    alt="Big Sale Banner"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-black/60" />
                                <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white">
                                    <h1 className="text-4xl md:text-6xl font-bold text-yellow-400 mb-4">
                                        BIG SALE
                                    </h1>
                                    <h2 className="text-2xl md:text-3xl font-bold mb-2">
                                        Save up to 49% off
                                    </h2>
                                    <p className="text-lg opacity-90 max-w-md">
                                        Let us help you with the best products
                                    </p>
                                </div>
                            </div>

                            {/* View Mode Controls */}
                            {/* View Mode Toggle */}
                            <div className="flex items-center space-x-2 mb-2.5">
                                <Button
                                    variant={
                                        viewMode === 'grid'
                                            ? 'default'
                                            : 'outline'
                                    }
                                    size="sm"
                                    onClick={() => {
                                        setViewMode('grid');
                                    }}
                                    className={
                                        viewMode === 'grid'
                                            ? 'bg-blue-600 hover:bg-blue-700'
                                            : ''
                                    }
                                >
                                    <Grid3X3 className="h-4 w-4 mr-1" />
                                    Grid
                                </Button>
                                <Button
                                    variant={
                                        viewMode === 'list'
                                            ? 'default'
                                            : 'outline'
                                    }
                                    size="sm"
                                    onClick={() => {
                                        setViewMode('list');
                                    }}
                                    className={
                                        viewMode === 'list'
                                            ? 'bg-blue-600 hover:bg-blue-700'
                                            : ''
                                    }
                                >
                                    <List className="h-4 w-4 mr-1" />
                                    List
                                </Button>
                            </div>

                            {/* Product Controls */}
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                                {/* Products Grid/List */}
                                <div
                                    className={
                                        viewMode === 'grid'
                                            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                                            : 'space-y-4'
                                    }
                                >
                                    {brandProducts.map((_, index) => (
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
                                                        <p className="text-xs text-gray-500 mb-2">
                                                            Brand Name
                                                        </p>
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <span className="text-lg font-bold text-blue-600">
                                                                BDT{' '}
                                                                {Number(
                                                                    0,
                                                                ).toFixed(2)}
                                                            </span>
                                                            <span className="text-sm text-gray-400 line-through">
                                                                BDT{' '}
                                                                {Number(
                                                                    0,
                                                                ).toFixed(2)}
                                                            </span>
                                                        </div>
                                                        <div className="mb-4">
                                                            <StartRating
                                                                rating={3}
                                                                reviewCount={0}
                                                            />
                                                            <p className="text-sm text-gray-500 mt-2 line-clamp-2 md:line-clamp-3">
                                                                This line should
                                                                be description
                                                                of product.
                                                                Current database
                                                                is not
                                                                integrated so
                                                                product
                                                                description is
                                                                unavailable.
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
                                    ))}
                                </div>
                            </div>
                            <TablePagination totalPage={4} restQuery={''} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
