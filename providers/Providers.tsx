'use client';

import ShopProvider from '@/context/ShopContext';
import UserProvider from '@/context/UserContext';
import StoreProvider from './StoreProvider';

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <StoreProvider>
            <ShopProvider>
                <UserProvider>{children}</UserProvider>
            </ShopProvider>
        </StoreProvider>
    );
};

export default Providers;
