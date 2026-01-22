'use client';

import { StartRating } from '@/components/home-page/product-components/star-component';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';

export const AllProductsFilter = () => {
    const brandProducts = [1, 2, 3, 4, 5, 6, 7];
    const selectedRating = null;
    return (
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
                                            <span>Brand Name</span>
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
                    {(brandProducts.length > 0 || selectedRating !== null) && (
                        <>
                            <Separator className="my-6" />
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-3">
                                    Active Filters
                                </h4>
                                <div className="space-y-2">
                                    {brandProducts.map((_, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className="flex items-center justify-between bg-blue-50 px-3 py-1 rounded-full"
                                            >
                                                <span className="text-sm text-blue-700">
                                                    Brand Name
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
                                    })}
                                    {selectedRating && (
                                        <div className="flex items-center justify-between bg-blue-50 px-3 py-1 rounded-full">
                                            <div className="flex items-center space-x-1">
                                                <StartRating
                                                    rating={selectedRating}
                                                    reviewCount={0}
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
    );
};
