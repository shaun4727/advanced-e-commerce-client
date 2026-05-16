'use client';

import { IProduct, productsWithId } from '@/types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export function ProductSearchResults({
    products,
}: {
    products: productsWithId[];
}) {
    const router = useRouter();

    const getDetailOfTheProduct = (product: IProduct) => {
        router.push(`/products/${product._id}`);
    };

    return (
        <div className="flex flex-col w-full bg-background pt-4">
            {/* 2. Product List */}
            <div className="flex flex-col space-y-8 pt-6 pb-20">
                {products.map((product) => (
                    // The 'group' class here tracks hover state for the entire row
                    <div
                        key={product._id}
                        onClick={() => getDetailOfTheProduct(product)}
                        className="group flex items-center gap-6 cursor-pointer"
                    >
                        {/* Product Image */}
                        <div className="relative size-24 shrink-0 bg-[#F5F5F5] overflow-hidden">
                            <Image
                                src={product.imageUrls?.[0]}
                                alt={product.name}
                                fill
                                className="object-cover mix-blend-multiply p-2 transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>

                        {/* Product Details & Animated Underline */}
                        <div className="flex flex-col items-start">
                            {/* Title with Left-to-Right Underline Effect */}
                            <h4
                                className="relative text-[15px] font-bold text-foreground inline-block pb-0.5
                after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] 
                after:bg-foreground 
                after:origin-left after:scale-x-0 
                after:transition-transform after:duration-300 after:ease-out
                group-hover:after:scale-x-100"
                            >
                                {product.name}
                            </h4>

                            <p className="text-[15px] text-muted-foreground mt-1">
                                ${product.price.toFixed(2)}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
