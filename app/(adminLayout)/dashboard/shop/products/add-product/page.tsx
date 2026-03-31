import AddProductsForm from '@/dashboard-components/products-components/product-sub-components/add-products-form';

export const metadata = {
    title: 'Add Product',
    description: 'an e-commerce website',
};

const AddProductPage = () => {
    return (
        <div className="">
            <div className="flex items-center justify-center">
                <AddProductsForm />
            </div>
        </div>
    );
};

export default AddProductPage;
