'use client';
import { Card, CardContent } from '@/components/ui/card';
import { IBrand } from '@/types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export const BrandCard = ({ brand }: { brand: IBrand }) => {
    const router = useRouter();

    const getProductsFromBrand = (brand: IBrand) => {
        router.push(`/products?brands=${brand._id}`);
    };

    return (
        <div>
            <Card
                onClick={() => {
                    getProductsFromBrand(brand);
                }}
                className="h-full hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-blue-300 bg-white group-hover:scale-105"
            >
                <CardContent className="p-6 text-center h-full flex flex-col justify-between">
                    {/* Brand Logo */}
                    <div className="mb-4">
                        <div className="w-24 h-16 mx-auto bg-gray-50 rounded-lg flex items-center justify-center group-hover:bg-blue-50 transition-colors duration-200">
                            <Image
                                src={brand.logo || '/placeholder.svg'}
                                alt={`logo`}
                                width={80}
                                height={60}
                                className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                            />
                        </div>
                    </div>

                    {/* Brand Info */}
                    <div className="flex-1">
                        <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                            {brand?.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                            Here can be any description
                        </p>
                        <div className="text-xs text-blue-600 font-medium">
                            {10} Products
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
