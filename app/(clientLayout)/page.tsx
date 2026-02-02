import { CategorySection } from '@/components/home-page/category-section';
import { FlashSale } from '@/components/home-page/flash-sale';
import { HeroSection } from '@/components/home-page/hero-section';
import { TopBrandsComponent } from '@/components/home-page/top-brands';
import { TrendingProducts } from '@/components/home-page/trending-products';
import { getAllBrands } from '@/services/Brand';
import {
    getFlashSaleProductsApi,
    getTrendingProductsApi,
} from '@/services/ProductServices';

export default async function Home() {
    const { data: trendingProducts } = await getTrendingProductsApi();
    const { data: flashSaleProducts } = await getFlashSaleProductsApi();
    const { data: allBrands } = await getAllBrands();
    return (
        <>
            <HeroSection />
            <CategorySection />
            <TrendingProducts trendingProducts={trendingProducts} />
            <FlashSale flashSaleProducts={flashSaleProducts} />
            <TopBrandsComponent allBrands={allBrands} />
        </>
    );
}
