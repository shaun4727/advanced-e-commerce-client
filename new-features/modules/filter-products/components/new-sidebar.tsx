import { Checkbox } from '@/components/ui/checkbox';
import { IBrandWithProducts } from '@/types';
import { Minus, Plus, Star } from 'lucide-react';

export type FilterSection = 'brand' | 'rating' | 'price';

export interface FilterDataStructure {
    brands: IBrandWithProducts[];
    ratings: number[];
    prices: string[];
}

export interface FilterSidebarProps {
    expandedSections: Record<FilterSection, boolean>;
    toggleSection: (section: FilterSection) => void;
    filterData: FilterDataStructure;
}

export const FilterSidebar = ({
    expandedSections,
    toggleSection,
    filterData,
}: FilterSidebarProps) => {
    return (
        <div className="w-[280px] pr-6 flex flex-col">
            {/* Brand Section */}
            <div className="border-b border-black pb-4 mb-4">
                <button
                    onClick={() => toggleSection('brand')}
                    className="flex w-full justify-between items-center py-2 uppercase text-sm font-bold tracking-wide"
                >
                    Brand
                    {expandedSections.brand ? (
                        <Minus size={16} />
                    ) : (
                        <Plus size={16} />
                    )}
                </button>

                <div
                    className={`overflow-hidden transition-all duration-300 ${
                        expandedSections.brand ? 'max-h-64 mt-2' : 'max-h-0'
                    }`}
                >
                    <div className="flex flex-col gap-3 pb-2">
                        {filterData.brands.map((brand, idx) => (
                            <label
                                key={idx}
                                className="flex items-center gap-3 cursor-pointer group"
                            >
                                <Checkbox
                                    id={brand._id}
                                    className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                                />
                                <span className="text-sm text-slate-700">
                                    {brand.name}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            {/* Rating Section */}
            <div className="border-b border-black pb-4 mb-4">
                <button
                    onClick={() => toggleSection('rating')}
                    className="flex w-full justify-between items-center py-2 uppercase text-sm font-bold tracking-wide"
                >
                    Star Rating
                    {expandedSections.rating ? (
                        <Minus size={16} />
                    ) : (
                        <Plus size={16} />
                    )}
                </button>

                <div
                    className={`overflow-hidden transition-all duration-300 ${
                        expandedSections.rating ? 'max-h-64 mt-2' : 'max-h-0'
                    }`}
                >
                    <div className="flex flex-col gap-3 pb-2">
                        {filterData.ratings.map((rating, idx) => (
                            <label
                                key={idx}
                                className="flex items-center gap-3 cursor-pointer group"
                            >
                                <div className="w-4 h-4 border border-slate-400 rounded-sm flex items-center justify-center group-hover:border-black transition-colors" />
                                <div className="flex items-center gap-1">
                                    {Array.from({ length: 5 }).map(
                                        (_, starIdx) => (
                                            <Star
                                                key={starIdx}
                                                size={14}
                                                className={
                                                    starIdx < rating
                                                        ? 'fill-yellow-400 text-yellow-400'
                                                        : 'text-slate-300'
                                                }
                                            />
                                        ),
                                    )}
                                    <span className="text-xs text-slate-500 ml-1">
                                        & Up
                                    </span>
                                </div>
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            {/* Price Section */}
            <div className="border-b border-black pb-4 mb-4">
                <button
                    onClick={() => toggleSection('price')}
                    className="flex w-full justify-between items-center py-2 uppercase text-sm font-bold tracking-wide"
                >
                    Price Range
                    {expandedSections.price ? (
                        <Minus size={16} />
                    ) : (
                        <Plus size={16} />
                    )}
                </button>

                <div
                    className={`overflow-hidden transition-all duration-300 ${
                        expandedSections.price ? 'max-h-64 mt-2' : 'max-h-0'
                    }`}
                >
                    <div className="flex flex-col gap-3 pb-2">
                        {filterData.prices.map((price, idx) => (
                            <label
                                key={idx}
                                className="flex items-center gap-3 cursor-pointer group"
                            >
                                <div className="w-4 h-4 border border-slate-400 rounded-sm flex items-center justify-center group-hover:border-black transition-colors" />
                                <span className="text-sm text-slate-700">
                                    {price}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
