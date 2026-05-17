import ProductFilterSection from '@/new-features/modules/filter-products/filter-product';
import { getAllProducts } from '@/services/ProductServices';

const page = async () => {
    const { data: products, meta } = await getAllProducts(
        undefined,
        undefined,
        undefined,
    );
    return <ProductFilterSection products={products} />;
};

export default page;
