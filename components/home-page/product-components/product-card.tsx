import { Card, CardContent } from '@/components/ui/card';
import { IProduct } from '@/types';
import Image from 'next/image';
import { StartRating } from './star-component';

export const ProductCard = ({ product }: { product: IProduct }) => {
    return (
        <div>
            <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-sm bg-white">
                <CardContent className="p-0">
                    {/* Product Image */}
                    <div className="relative aspect-square bg-gray-50 rounded-t-lg overflow-hidden">
                        <Image
                            src={product.imageUrls?.[0] || '/placeholder.svg'}
                            alt={`product-image`}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                        {/* Rating */}
                        <StartRating
                            rating={product.averageRating}
                            reviewCount={0}
                        />

                        {/* Product Name */}
                        <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 leading-tight text-sm">
                            {product.name}
                        </h3>

                        {/* Price */}
                        <div className="mb-3">
                            <span className="text-lg font-semibold text-gray-900">
                                BDT {Number(product.offerPrice).toFixed(2)}
                            </span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
