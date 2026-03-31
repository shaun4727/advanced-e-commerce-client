import { AllProducts } from '@/components/all-products-page/all-products';

export const metadata = {
    title: 'Products',
    description: 'an e-commerce website',
};

const page = () => {
    return (
        <div>
            <AllProducts />
        </div>
    );
};

export default page;
