'use client';

import { Button } from '@/components/ui/button';
import { homePageBrandWithProduct } from '@/services/Brand';
import { IBrandWithProducts } from '@/types';
import { gsap } from 'gsap';
import { LayoutGrid, List, SlidersHorizontal, Star } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { FilterSidebar } from './components/new-sidebar';

// 1. Define a TypeScript type for the allowed section names
type FilterSection = 'brand' | 'rating' | 'price';

export default function ProductFilterSection() {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    // 2. Explicitly type the state to use those section names as keys
    const [expandedSections, setExpandedSections] = useState<
        Record<FilterSection, boolean>
    >({
        brand: true,
        rating: false,
        price: false,
    });

    const [brandWithProduct, setBrandWithProduct] = useState<
        IBrandWithProducts[]
    >([]);

    const sidebarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isFilterOpen) {
            gsap.to(sidebarRef.current, {
                width: 280,
                opacity: 1,
                duration: 0.4,
                ease: 'power3.out',
            });
        } else {
            gsap.to(sidebarRef.current, {
                width: 0,
                opacity: 0,
                duration: 0.4,
                ease: 'power3.out',
            });
        }
    }, [isFilterOpen]);

    // 3. Apply the type to the function parameter
    const toggleSection = (section: FilterSection) => {
        setExpandedSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    const filterData = {
        brands: brandWithProduct,
        ratings: [5, 4, 3, 2, 1],
        prices: ['Under $50', '$50 - $100', '$100 - $150', 'Over $150'],
    };

    const dummyProducts = Array.from({ length: 8 }).map((_, i) => i);

    // sidebar apis

    useEffect(() => {
        const getBrandsWithProducts = async () => {
            try {
                const res = await homePageBrandWithProduct();
                if (res?.success) {
                    setBrandWithProduct(res?.data);
                } else {
                    console.log(res?.message);
                }
            } catch (err) {
                console.log(err);
            }
        };
        getBrandsWithProducts();
    }, []);

    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans p-6 md:p-10 max-w-[1600px] mx-auto">
            <h1 className="text-[4vw] font-smooch font-bold uppercase tracking-tight mb-8">
                find your product
            </h1>

            <div className="flex justify-between items-center pb-4 border-b border-black mb-8">
                <button
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="flex items-center gap-2 border border-slate-300 px-4 py-2 hover:bg-slate-50 transition-colors uppercase text-sm font-medium"
                >
                    <SlidersHorizontal size={16} />
                    Filters
                </button>

                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium uppercase mr-2">
                        View:
                    </span>
                    <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 border transition-colors ${viewMode === 'grid' ? 'border-black bg-slate-100' : 'border-transparent hover:bg-slate-50'}`}
                    >
                        <LayoutGrid size={18} />
                    </button>
                    <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 border transition-colors ${viewMode === 'list' ? 'border-black bg-slate-100' : 'border-transparent hover:bg-slate-50'}`}
                    >
                        <List size={18} />
                    </button>
                </div>
            </div>

            <div className="flex items-start gap-8">
                <div
                    ref={sidebarRef}
                    className="overflow-hidden shrink-0"
                    style={{ width: 0, opacity: 0 }}
                >
                    <FilterSidebar
                        expandedSections={expandedSections} // Plural to match your state variable
                        toggleSection={toggleSection} // Added missing handler prop
                        filterData={filterData}
                    />
                </div>

                <div className="flex-1 transition-all duration-300 w-full">
                    <div
                        className={
                            viewMode === 'grid'
                                ? `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12`
                                : `flex flex-col gap-6`
                        }
                    >
                        {dummyProducts.map((item) => (
                            <div
                                key={item}
                                className={`group relative ${viewMode === 'list' ? ' flex gap-8 items-center border-b pb-6' : ''}`}
                            >
                                <div
                                    className={`bg-slate-100 relative ${viewMode === 'list' ? 'w-48 h-64 shrink-0' : 'aspect-[3/4] w-full mb-4'}`}
                                >
                                    <div className="absolute top-2 left-2 bg-black text-white text-[10px] uppercase px-2 py-1 font-bold">
                                        New Colors
                                    </div>
                                </div>
                                <div>
                                    <div className="flex gap-1 mb-2">
                                        <div className="w-3 h-3 bg-amber-700 border border-slate-300"></div>
                                        <div className="w-3 h-3 bg-slate-800 border border-slate-300"></div>
                                        <div className="w-3 h-3 bg-slate-400 border border-slate-300"></div>
                                    </div>
                                    <h3 className="font-bold text-sm uppercase mb-1">
                                        T2 Workpant
                                    </h3>
                                    <div className="flex items-center gap-1 mb-1">
                                        <div className="flex">
                                            <Star
                                                size={12}
                                                className="fill-black text-black"
                                            />
                                            <Star
                                                size={12}
                                                className="fill-black text-black"
                                            />
                                            <Star
                                                size={12}
                                                className="fill-black text-black"
                                            />
                                            <Star
                                                size={12}
                                                className="fill-black text-black"
                                            />
                                            <Star
                                                size={12}
                                                className="text-black"
                                            />
                                        </div>
                                        <span className="text-xs text-slate-500">
                                            4.0 (1830)
                                        </span>
                                    </div>
                                    <p className="text-sm font-medium">
                                        $99.00
                                    </p>
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/5 pointer-events-auto">
                                    <Button
                                        variant="secondary"
                                        className="bg-white text-black hover:bg-gray-100 uppercase font-bold tracking-widest text-xs rounded-none shadow-xl border border-gray-200"
                                    >
                                        + Quick Add
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
