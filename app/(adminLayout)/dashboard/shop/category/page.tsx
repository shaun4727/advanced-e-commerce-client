import ManageCategories from '@/dashboard-components/category-components/category-page';
import { getAllCategories } from '@/services/Category';

export const metadata = {
    title: 'Categories',
    description: 'an e-commerce website',
};

const page = async () => {
    const { data } = await getAllCategories();
    return (
        <div>
            <ManageCategories categories={data} />
        </div>
    );
};

export default page;
