import UpdateProductForm from '@/dashboard-components/products-components/product-sub-components/UpdateProductForm';
import { getSingleProduct } from '@/services/ProductServices';

const UpdateProductPage = async ({
    params,
}: {
    params: Promise<{ productId: string }>;
}) => {
    const { productId } = await params;

    const { data: product } = await getSingleProduct(productId);

    return (
        <div className="flex justify-center items-center">
            <UpdateProductForm product={product} />
        </div>
    );
};

export default UpdateProductPage;
