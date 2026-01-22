import { CategorySection } from '@/components/home-page/category-section';
import { FlashSale } from '@/components/home-page/flash-sale';
import { HeroSection } from '@/components/home-page/hero-section';
import { TopBrandsComponent } from '@/components/home-page/top-brands';
import { TrendingProducts } from '@/components/home-page/trending-products';

export default function Home() {
    return (
        <>
            <HeroSection />
            <CategorySection />
            <TrendingProducts />
            <FlashSale />
            <TopBrandsComponent />
        </>
    );
}
