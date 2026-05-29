import { ProductSlider } from '@/components/ui/core/custom-slider';
import { Separator } from '@/components/ui/separator';
import { IProduct } from '@/types';

export const SimilarProducts = ({ products }: { products: IProduct[] }) => {
    return (
        <div className="mt-16">
            <div>
                <h1 className="text-[4vw] uppercase font-smooch font-bold">
                    Similar Products
                </h1>
                <Separator />
            </div>
            <ProductSlider products={products} />
        </div>
    );
};
