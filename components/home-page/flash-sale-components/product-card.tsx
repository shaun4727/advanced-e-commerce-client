import { Card, CardContent } from '@/components/ui/card';
import { IProduct } from '@/types';
import { Badge } from 'lucide-react';
import Image from 'next/image';

export const ProductCard = ({ product }: { product: IProduct }) => {
    return (
        <div>
            <Card
                className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-white"
                onClick={() => {}}
            >
                <CardContent className="p-0">
                    {/* Product Image */}
                    <div className="relative aspect-square bg-gray-100 rounded-t-lg overflow-hidden">
                        <Image
                            src={product.imageUrls?.[0] || '/placeholder.svg'}
                            alt={'product-img'}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />

                        {/* Discount Badge */}
                        <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-600 text-white">
                            -35%
                        </Badge>
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                        <h3 className="font-medium text-gray-900 mb-3 line-clamp-2 leading-tight">
                            {product.name}
                        </h3>

                        {/* Pricing */}
                        <div className="mb-3">
                            <div className="flex items-center space-x-2 mb-1">
                                <span className="text-lg font-bold text-blue-600">
                                    BDT {Number(product.offerPrice).toFixed(2)}
                                </span>
                            </div>
                            <span className="text-sm text-gray-500 line-through">
                                BDT {Number(product.price).toFixed(2)}
                            </span>
                        </div>

                        {/* Sale Progress */}
                        <p className="text-sm text-gray-600">30 Sale</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
