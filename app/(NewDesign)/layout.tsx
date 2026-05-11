import MainNavbar from '@/new-features/shared/header/navbar';

const CommonNewLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <MainNavbar />
            {children}
        </div>
    );
};

export default CommonNewLayout;
