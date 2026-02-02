import { homePageBrandWithProduct } from '@/services/Brand';
import { IBrand } from '@/types';
import { CategoryCard } from './category-components/category-card';

export const CategorySection = async () => {
    const { data } = await homePageBrandWithProduct();

    return (
        <>
            {/* category section */}
            <div className="w-full mt-16 md:mt-44 md:px-16">
                {/* Section Header */}
                <div className="text-center mb-10 mt-7">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Shop by Category
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Discover our wide range of products across different
                        categories
                    </p>
                </div>

                <div className="flex gap-2.5 overflow-x-auto md:hidden">
                    {data.map((category: IBrand, index: number) => (
                        <div key={index} className="shrink-0 cursor-pointer">
                            <CategoryCard category={category} />
                        </div>
                    ))}
                </div>

                <div className="hidden md:grid grid-cols-3 lg:grid-cols-5 xl:grid-cols-4 gap-6">
                    {data?.map((category: IBrand, index: number) => (
                        <div key={index}>
                            <CategoryCard category={category} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};
