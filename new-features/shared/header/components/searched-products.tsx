'use client';

import { productsWithId } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

// 1. Import SheetClose from your Shadcn UI folder
import { SheetClose } from '@/components/ui/sheet';

export function ProductSearchResults({
    products,
}: {
    products: productsWithId[];
}) {
    // Note: useRouter and getDetailOfTheProduct are no longer needed!

    return (
        <div className="flex flex-col w-full bg-background pt-4">
            <div className="flex flex-col space-y-8 pt-6 pb-20">
                {products.map((product) => (
                    // 2. Wrap the entire item in SheetClose using asChild
                    <SheetClose asChild key={product._id}>
                        {/* 3. Use Next.js Link instead of an onClick div */}
                        <Link
                            href={`/product-detail/${product._id}`}
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
                        </Link>
                    </SheetClose>
                ))}
            </div>
        </div>
    );
}
