import { ShopPage } from '@/dashboard-components/products-components/shop-page';

export const metadata = {
    title: 'Shop Detail',
    description: 'an e-commerce website',
};

const page = () => {
    return (
        <div className="flex justify-center">
            <ShopPage />
        </div>
    );
};

export default page;
