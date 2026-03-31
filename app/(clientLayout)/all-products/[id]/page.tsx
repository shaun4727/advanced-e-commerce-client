import { SingleProductPage } from '@/components/all-products-page/single-product-page';

export const metadata = {
    title: 'Product Detail',
    description: 'an e-commerce website',
};

const page = () => {
    return (
        <div>
            <SingleProductPage />
        </div>
    );
};

export default page;
