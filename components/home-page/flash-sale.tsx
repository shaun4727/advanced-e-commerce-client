'use client';

import { Zap } from 'lucide-react';
import { Button } from '../ui/button';
import { CountdownTimer } from './flash-sale-components/count-down-timer';
import { ProductCard } from './flash-sale-components/product-card';

export const FlashSale = () => {
    return (
        <div className="w-full mt-16 px-2.5">
            <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                        <Zap className="h-5 w-5 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">
                        Flash Sale
                    </h2>
                </div>
                <CountdownTimer />
            </div>
            <div className="md:hidden">
                <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
                    {[1, 1, 1, 1]?.map((_, index) => (
                        <div key={index} className="w-64 shrink-0">
                            <ProductCard />
                        </div>
                    ))}
                </div>
            </div>
            {/* View All Button */}
            <div className="text-center mt-8">
                <Button
                    variant="outline"
                    onClick={() => {}}
                    size="lg"
                    className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors duration-200"
                >
                    View All Flash Sale Items
                </Button>
            </div>
        </div>
    );
};
