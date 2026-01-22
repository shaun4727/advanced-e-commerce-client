import { HeroSection } from '@/components/home-page/hero-section';
import { RestOfThePage } from '@/components/home-page/rest-of-the-page';
import { NavBar } from '@/components/shared-components/navbar-ui/navbar';

export default function Home() {
    return (
        <>
            <NavBar />
            <HeroSection />
            <RestOfThePage />
        </>
    );
}
