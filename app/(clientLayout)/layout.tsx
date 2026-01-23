import FooterSection from '@/components/shared-components/footer-ui/footer-section';
import { NavBar } from '@/components/shared-components/navbar-ui/navbar';

const ClientLayout = async ({ children }: { children: React.ReactNode }) => {
    return (
        <main>
            <NavBar />
            {children}
            <FooterSection />
        </main>
    );
};

export default ClientLayout;
