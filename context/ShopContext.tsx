import { getShopInfoApi } from '@/services/ShopServices';
import { shopFormData } from '@/types/shop';
import {
    createContext,
    Dispatch,
    SetStateAction,
    useContext,
    useEffect,
    useState,
} from 'react';

interface IShopProviderValues {
    shopInfo: shopFormData | null;
    isLoading: boolean;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const ShopContext = createContext<IShopProviderValues | undefined>(undefined);

const ShopProvider = ({ children }: { children: React.ReactNode }) => {
    const [shopInfo, setShopInfo] = useState<shopFormData | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Only fetch if isLoading is actually true
        if (!isLoading) return;

        const shopInfoMethod = async () => {
            try {
                const res = await getShopInfoApi();
                if (res.success) {
                    setShopInfo(res.data); // Don't forget to store the data!
                }
            } catch (err) {
                console.error(err);
            } finally {
                // This sets isLoading to false, which triggers the effect again,
                // but the "if (!isLoading) return" guard above stops the loop.
                setIsLoading(false);
            }
        };

        shopInfoMethod();
    }, [isLoading]); // Keep isLoading here so it reacts to changes

    return (
        <ShopContext.Provider
            value={{
                shopInfo,
                isLoading,
                setIsLoading,
            }}
        >
            {children}
        </ShopContext.Provider>
    );
};

export const useShop = () => {
    const context = useContext(ShopContext);

    if (context == undefined) {
        throw new Error('useUser must be used within the UserProvider context');
    }

    return context;
};

export default ShopProvider;
