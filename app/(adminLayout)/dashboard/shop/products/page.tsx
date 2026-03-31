import ManageProducts from '@/dashboard-components/products-components/manage-products';
import { getMyShopProductsApi } from '@/services/ProductServices';

export const metadata = {
    title: 'Manage Product',
    description: 'an e-commerce website',
};

const page = async () => {
    const { data, meta } = await getMyShopProductsApi();
    return (
        <div>
            <ManageProducts products={data} meta={meta} />
        </div>
    );
};

export default page;
