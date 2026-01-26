import ManageCategories from '@/dashboard-components/category-components/category-page';
import { getAllCategories } from '@/services/Category';

const page = async () => {
    const { data } = await getAllCategories();
    return (
        <div>
            <ManageCategories categories={data} />
        </div>
    );
};

export default page;
