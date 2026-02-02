import { MenuExplorer } from '@/dashboard-components/nav-menu-builder/menu-explorer';
import NavMenuBuilder from '@/dashboard-components/nav-menu-builder/nav-builder-form';
import { getAllCategories } from '@/services/Category';
import { getNavigationApi } from '@/services/NavmenuService';

const page = async () => {
    const res = await getNavigationApi();
    const { data: categories } = await getAllCategories();

    return (
        <div>
            <NavMenuBuilder />
            <MenuExplorer navMenu={res.data?.[0]} categories={categories} />
        </div>
    );
};

export default page;
