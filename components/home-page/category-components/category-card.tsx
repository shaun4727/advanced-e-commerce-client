'use client';

import { Card, CardContent } from '@/components/ui/card';
import { IBrand } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

export const CategoryCard = ({ category }: { category: IBrand }) => {
    return (
        <Link href={`/products?brands=${category._id}`} className="group">
            <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-200 bg-white group-hover:scale-105">
                <CardContent className="p-6 text-center">
                    {/* Icon Container */}
                    <div className="w-24 h-24 mx-auto mb-4 bg-blue-50 rounded-full flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-200">
                        <Image
                            src={category.logo || '/placeholder.svg'}
                            alt={category.name}
                            width={200}
                            height={200}
                            className="w-12"
                        />
                    </div>

                    {/* Category Name */}
                    <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors duration-200">
                        {category?.name}
                    </h3>
                </CardContent>
            </Card>
        </Link>
    );
};
