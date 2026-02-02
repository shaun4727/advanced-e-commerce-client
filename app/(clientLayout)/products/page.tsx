import AllProductsSection from '@/components/home-page/components/all-products-components';
import { getAllProducts } from '@/services/ProductServices';

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const AllProductsPage = async ({
    searchParams,
}: {
    searchParams: SearchParams;
}) => {
    const query = await searchParams;

    const { data: products, meta } = await getAllProducts(
        undefined,
        undefined,
        query,
    );

    return <AllProductsSection products={products} meta={meta} />;
};

export default AllProductsPage;
