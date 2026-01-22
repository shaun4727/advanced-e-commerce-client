import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

export const CategoryCard = () => {
    return (
        <Link href={`/products`} className="group">
            <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-200 bg-white group-hover:scale-105">
                <CardContent className="p-6 text-center">
                    {/* Icon Container */}
                    <div className="w-24 h-24 mx-auto mb-4 bg-blue-50 rounded-full flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-200">
                        {/* <div className="text-blue-600 group-hover:text-blue-700 transition-colors duration-200">
              {category.logo}
            </div> */}

                        <Image
                            src={'/placeholder.svg'}
                            alt={`category.name`}
                            width={200}
                            height={200}
                            className="w-12"
                        />
                    </div>

                    {/* Category Name */}
                    <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors duration-200">
                        Temp Category
                    </h3>
                </CardContent>
            </Card>
        </Link>
    );
};
