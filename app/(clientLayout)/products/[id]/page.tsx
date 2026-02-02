import ProductDetail from '@/components/product-detail/product-detail';
import { getSingleProduct } from '@/services/ProductServices';

const ProductDetailPage = async ({
    params,
}: {
    params: Promise<{ id: string }>;
}) => {
    const { id } = await params;
    const { data: product } = await getSingleProduct(id);

    return <ProductDetail product={product} />;
};

export default ProductDetailPage;
