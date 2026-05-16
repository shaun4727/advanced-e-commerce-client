import { ProductSlider } from '@/components/ui/core/custom-slider';
import { getFlashSaleProductsApi } from '@/services/ProductServices';
import { Zap } from 'lucide-react';
import { CountdownTimer } from './components/count-down-timer';

export const FlashSale = async () => {
    const { data: flashSaleProducts } = await getFlashSaleProductsApi();
    return (
        <div>
            <div className="flex items-center space-x-4 mx-4">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center flash-sign">
                        <Zap className="h-5 w-5 text-white" />
                    </div>
                    <div className="relative">
                        <h2 className="text-[4vw] font-smooch uppercase font-bold text-gray-900 flash-text-revealer">
                            Flash Sale
                        </h2>
                    </div>
                </div>
                <div className="flash-timer">
                    <CountdownTimer />
                </div>
            </div>
            <ProductSlider products={flashSaleProducts} />
        </div>
    );
};
