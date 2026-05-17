import ProductFilterSection from '@/new-features/modules/filter-products/filter-product';
import { getAllProducts } from '@/services/ProductServices';

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const page = async ({ searchParams }: { searchParams: SearchParams }) => {
    const query = await searchParams;

    const { data: products, meta } = await getAllProducts(
        undefined,
        '10',
        query,
    );
    return <ProductFilterSection products={products} meta={meta} />;
};

export default page;
