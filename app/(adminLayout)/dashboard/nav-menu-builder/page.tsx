import MegaMenuManager from '@/dashboard-components/nav-menu-builder/mega-menu-manager';
import NavMenuBuilder from '@/dashboard-components/nav-menu-builder/nav-builder-form';

const page = () => {
    return (
        <div>
            <NavMenuBuilder />
            <MegaMenuManager />
        </div>
    );
};

export default page;
