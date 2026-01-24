'use client';

import ShopProvider from '@/context/ShopContext';
import UserProvider from '@/context/UserContext';

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <ShopProvider>
            <UserProvider>{children}</UserProvider>
        </ShopProvider>
    );
};

export default Providers;
