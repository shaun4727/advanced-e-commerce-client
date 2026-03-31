import ManageBrands from '@/dashboard-components/brand-components/brand-component';
import { getAllBrands } from '@/services/Brand';

export const metadata = {
    title: 'Brands',
    description: 'an e-commerce website',
};

const page = async () => {
    const { data } = await getAllBrands();
    return (
        <div>
            <ManageBrands brands={data} />
        </div>
    );
};

export default page;
