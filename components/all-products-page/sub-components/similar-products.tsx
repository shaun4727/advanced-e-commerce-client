'use client';

import { StartRating } from '@/components/home-page/product-components/star-component';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { addProduct } from '@/redux/features/cartSlice';
import { useAppDispatch } from '@/redux/hooks';
import { IProduct } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'sonner';

// 1. Properly define the expected props so TypeScript stops throwing the error

export const SimilarProducts = ({
    similarProduct,
}: {
    similarProduct: IProduct[];
}) => {
    const dispatch = useAppDispatch();

    // If there are no similar products, don't render the section
    if (!similarProduct || similarProduct.length === 0) return null;

    const handleAddToCart = (e: React.MouseEvent, product: IProduct) => {
        e.preventDefault();
        dispatch(addProduct({ ...product, quantity: 1 }));
        toast.success('Added to cart');
    };

    return (
        <div className="mt-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Similar Products
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* 2. Map over the products and ACTUALLY use the product variable */}
                {similarProduct.map((product, index) => (
                    <Link
                        href={`/products/${product._id}`}
                        key={product._id || index}
                    >
                        <Card className="group hover:shadow-lg transition-all duration-300 h-full cursor-pointer">
                            <CardContent className="p-4 flex flex-col h-full">
                                {/* Image */}
                                <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                                    <Image
                                        src={
                                            product.imageUrls?.[0] ||
                                            '/placeholder-image.png'
                                        }
                                        alt={product.name || 'product-image'}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                        className="object-cover group-hover:scale-105 transition-transform duration-300 mix-blend-multiply"
                                    />
                                </div>

                                {/* Title */}
                                <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[40px]">
                                    {product.name}
                                </h4>

                                {/* Rating */}
                                <StartRating
                                    rating={product.averageRating || 0}
                                    reviewCount={product.ratingCount || 0}
                                />

                                {/* Price */}
                                <div className="flex items-center space-x-2 mt-2 flex-grow">
                                    <span className="text-lg font-bold text-blue-600">
                                        BDT{' '}
                                        {product.offerPrice
                                            ? Number(
                                                  product.offerPrice,
                                              ).toFixed(2)
                                            : Number(product.price).toFixed(2)}
                                    </span>
                                    {product.offerPrice && (
                                        <span className="text-sm text-gray-500 line-through">
                                            BDT{' '}
                                            {Number(product.price).toFixed(2)}
                                        </span>
                                    )}
                                </div>

                                {/* Add to Cart */}
                                <Button
                                    onClick={(e) => handleAddToCart(e, product)}
                                    className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white z-10 relative"
                                >
                                    Add to Cart
                                </Button>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
};
