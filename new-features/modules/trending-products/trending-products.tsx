import { ProductSlider } from '@/components/ui/core/custom-slider';
import { getTrendingProductsApi } from '@/services/ProductServices';

export const TrendingProducts = async () => {
    const { data: trendingProducts } = await getTrendingProductsApi();
    return (
        <div>
            <div className="flex items-center space-x-4 mx-4">
                <div className="flex items-center space-x-3">
                    <div className="relative">
                        <h2 className="text-[4vw] font-smooch uppercase font-bold text-gray-900 flash-text-revealer">
                            Trending Products
                        </h2>
                    </div>
                </div>
            </div>
            <ProductSlider products={trendingProducts} />;
        </div>
    );
};
