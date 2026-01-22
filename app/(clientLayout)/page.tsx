import { CategorySection } from '@/components/home-page/category-section';
import { FlashSale } from '@/components/home-page/flash-sale';
import { HeroSection } from '@/components/home-page/hero-section';
import { TopBrandsComponent } from '@/components/home-page/top-brands';
import { TrendingProducts } from '@/components/home-page/trending-products';
import FooterSection from '@/components/shared-components/footer-ui/footer-section';
import { NavBar } from '@/components/shared-components/navbar-ui/navbar';

export default function Home() {
    return (
        <>
            <NavBar />
            <HeroSection />
            <CategorySection />
            <TrendingProducts />
            <FlashSale />
            <TopBrandsComponent />
            <FooterSection />
        </>
    );
}
