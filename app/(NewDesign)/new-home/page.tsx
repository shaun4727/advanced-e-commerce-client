import { PromoCards } from '@/new-features/modules/flash-card/flash-card';
import { FlashSale } from '@/new-features/modules/flash-sale/flash-sale';
import { HeroSection } from '@/new-features/modules/hero-section/hero-section';
import { TrendingProducts } from '@/new-features/modules/trending-products/trending-products';

export default async function NewHomePage() {
    return (
        <div>
            <HeroSection />
            <div className="mt-24">
                <TrendingProducts />
            </div>
            <div className="mt-24">
                <PromoCards />
            </div>
            <div className="mt-24">
                <FlashSale />
            </div>
        </div>
    );
}
