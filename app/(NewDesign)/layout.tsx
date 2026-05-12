import FooterSection from '@/new-features/shared/footer/footer-section';
import MainNavbar from '@/new-features/shared/header/navbar';

const CommonNewLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <MainNavbar />
            {children}
            <FooterSection />
        </div>
    );
};

export default CommonNewLayout;
