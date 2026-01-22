import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

export const BrandCard = () => {
    return (
        <div>
            <Card
                onClick={() => {}}
                className="h-full hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-blue-300 bg-white group-hover:scale-105"
            >
                <CardContent className="p-6 text-center h-full flex flex-col justify-between">
                    {/* Brand Logo */}
                    <div className="mb-4">
                        <div className="w-24 h-16 mx-auto bg-gray-50 rounded-lg flex items-center justify-center group-hover:bg-blue-50 transition-colors duration-200">
                            <Image
                                src={'/placeholder.svg'}
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
                            Brand Name
                        </h3>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                            A brand promised to provide better products
                        </p>
                        <div className="text-xs text-blue-600 font-medium">
                            25 Products
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
