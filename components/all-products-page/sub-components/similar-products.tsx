import { StartRating } from '@/components/home-page/product-components/star-component';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

export const SimilarProducts = () => {
    const similarProducts = [1, 2, 3, 4, 5, 6, 7];

    return (
        <div className="mt-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Similar Products
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {similarProducts.map((_, index) => (
                    <Card
                        key={index}
                        onClick={() => {}}
                        className="group hover:shadow-lg transition-all duration-300"
                    >
                        <CardContent className="p-4">
                            <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                                <Image
                                    src={'/no-image'}
                                    alt={`product-image`}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                {/* <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full"
                >
                  <Heart className="h-4 w-4" />
                </Button> */}
                            </div>
                            <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                                Product Name
                            </h4>
                            <StartRating rating={3} reviewCount={4} />
                            <div className="flex items-center space-x-2 mt-2">
                                <span className="text-lg font-bold text-blue-600">
                                    BDT 5.60
                                </span>
                            </div>
                            <Button className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white">
                                Add to Cart
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};
