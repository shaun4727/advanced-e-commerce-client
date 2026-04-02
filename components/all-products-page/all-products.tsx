'use client';

import { Grid3X3, List } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import TablePagination from '../shared-components/pagination/pagination';
import { Button } from '../ui/button';
import { AllProductsFilter } from './sub-components/all-products-filter';
import { ProductCard } from './sub-components/product-card';

export const AllProducts = () => {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const brandProducts = [1, 2, 3, 4, 5, 6, 7];

    return (
        <div>
            <div className="w-full bg-gray-50 py-8">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Sidebar Filters */}
                        <AllProductsFilter />
                        {/* Main Content */}
                        <div className="lg:w-3/4">
                            {/* Promotional Banner */}
                            <div className="relative h-64 md:h-80 mb-8 rounded-lg overflow-hidden big-sale-section">
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
                                        <ProductCard
                                            key={index}
                                            viewMode={viewMode}
                                            index={index}
                                        />
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
