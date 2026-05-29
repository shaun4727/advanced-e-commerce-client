'use client';

import { Button } from '@/components/ui/button';
import TablePagination from '@/components/ui/core/EPTable/TablePagination';
import { addProduct } from '@/redux/features/cartSlice';
import { useAppDispatch } from '@/redux/hooks';
import { homePageBrandWithProduct } from '@/services/Brand';
import { IBrandWithProducts, IMeta, IProduct, productsWithId } from '@/types';
import { gsap } from 'gsap';
import { LayoutGrid, List, SlidersHorizontal, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { FilterSidebar } from './components/new-sidebar';

// 1. Define a TypeScript type for the allowed section names
type FilterSection = 'brand' | 'rating' | 'price';
interface filterOptionList {
    brands: string[];
    rating: number[];
}

export default function ProductFilterSection({
    products,
    meta,
}: {
    products: productsWithId[];
    meta: IMeta;
}) {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [restQuery, setRestQuery] = useState('');
    const router = useRouter();
    const [filterState, setFilterState] = useState<filterOptionList>({
        brands: [],
        rating: [],
    });
    // Replace the old priceRange state with this:
    const [selectedPrice, setSelectedPrice] = useState<string | undefined>(
        undefined,
    );

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

    const updateFilterParameters = (obj: {
        brand?: string;
        rating?: number;
        price?: string;
    }) => {
        if (obj?.brand) {
            setFilterState((prev) => {
                const brand = obj.brand as string;
                if (prev.brands.includes(brand)) {
                    return {
                        ...prev,
                        brands: prev.brands.filter(
                            (id: string) => id !== obj.brand,
                        ),
                    };
                } else {
                    return { ...prev, brands: [...prev.brands, brand] };
                }
            });
        }
        if (obj?.rating) {
            setFilterState((prev) => {
                const rating = obj.rating as number;
                if (prev.rating.includes(rating)) {
                    return {
                        ...prev,
                        rating: prev.rating.filter(
                            (id: number) => id !== obj.rating,
                        ),
                    };
                } else {
                    return { ...prev, rating: [...prev.rating, rating] };
                }
            });
        }
        if (obj?.price) {
            setSelectedPrice((prevPrice) =>
                // If clicking the currently selected price, uncheck it (set to undefined).
                // Otherwise, set it to the new price.
                prevPrice === obj.price ? undefined : obj.price,
            );
        }
    };

    const dispatch = useAppDispatch();
    const handleAddProduct = (
        product: IProduct,
        e: React.MouseEvent<HTMLButtonElement>,
    ) => {
        e.stopPropagation();
        dispatch(addProduct(product));
        toast.success('Product added to cart', { id: 1 });
    };

    useEffect(() => {
        const hasFilters =
            filterState.brands.length > 0 ||
            filterState.rating.length > 0 ||
            selectedPrice !== undefined;
        if (hasFilters || selectedPrice === undefined) {
            applyFilterMethod();
        }
    }, [filterState, selectedPrice]); // This runs automatically when a checkbox changes the state!

    const searchParams = useSearchParams();
    const applyFilterMethod = () => {
        const parameters = Object.entries(
            Object.fromEntries(searchParams.entries()),
        );
        const filtered = parameters.filter(
            ([key]) =>
                key !== 'minPrice' &&
                key !== 'maxPrice' &&
                key !== 'brands' &&
                key !== 'rating' &&
                key !== 'page' &&
                key !== 'category',
        );
        const string: string[] = [];
        filtered.forEach((param) => {
            const [key, value] = param;
            string.push(`${key}=${value}`);
        });

        if (filterState.brands.length) {
            string.push(`brands=${filterState.brands.toString()}`);
        }
        if (filterState.rating.length) {
            string.push(`rating=${filterState.rating.toString()}`);
        }
        if (selectedPrice) {
            let minPrice = 0;
            let maxPrice = 1000000; // arbitrary high max

            if (selectedPrice === 'Under $50') {
                maxPrice = 50;
            } else if (selectedPrice === '$50 - $100') {
                minPrice = 50;
                maxPrice = 100;
            } else if (selectedPrice === '$100 - $150') {
                minPrice = 100;
                maxPrice = 150;
            } else if (selectedPrice === 'Over $150') {
                minPrice = 150;
            }

            string.push(`minPrice=${minPrice}&maxPrice=${maxPrice}`);
        }
        setRestQuery(string.join('&'));
        router.push(`/products?${string.join('&')}`);
    };

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
                        expandedSections={expandedSections}
                        toggleSection={toggleSection}
                        filterData={filterData}
                        filterState={filterState}
                        onFilterChange={updateFilterParameters}
                        selectedPrice={selectedPrice} // <--- Pass the state down here
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
                        {products.map((item) => (
                            <div
                                key={item._id}
                                className={`group relative ${viewMode === 'list' ? ' flex gap-8 items-center border-b pb-6' : ''}`}
                            >
                                <div
                                    className={`bg-slate-100 relative overflow-hidden ${viewMode === 'list' ? 'w-48 h-64 shrink-0' : 'aspect-[3/4] w-full mb-4'}`}
                                >
                                    <Image
                                        src={item.imageUrls?.[0]}
                                        alt="Product image" // Replace with item.name or a relevant description
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm uppercase mb-1">
                                        {item.name}
                                    </h3>
                                    <div className="flex items-center gap-1 mb-1">
                                        <div className="flex">
                                            {Array.from({
                                                length: item.averageRating,
                                            }).map((_, idx) => (
                                                <Star
                                                    key={idx}
                                                    size={12}
                                                    className="fill-black text-black"
                                                />
                                            ))}
                                        </div>
                                        <span className="text-xs text-slate-500">
                                            {item.averageRating.toFixed(2)} (
                                            {item.ratingCount})
                                        </span>
                                    </div>
                                    <p className="text-sm font-medium">
                                        BDT {item.offerPrice}
                                    </p>
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/5 pointer-events-auto">
                                    <div className="flex flex-col gap-2">
                                        <Button
                                            onClick={(e) =>
                                                handleAddProduct(item, e)
                                            }
                                            variant="secondary"
                                            className="bg-white cursor-pointer text-black hover:bg-gray-100 uppercase font-bold tracking-widest text-xs rounded-none shadow-xl border border-gray-200"
                                        >
                                            + Quick Add
                                        </Button>
                                        <Link
                                            href={`/new-product-detail/${item._id}`}
                                            className="inline-flex items-center justify-center whitespace-nowrap bg-white text-black hover:bg-gray-100 uppercase font-bold tracking-widest text-xs rounded-none shadow-xl border border-gray-200 h-9 px-4 py-2 transition-colors"
                                        >
                                            View Detail
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center py-4">
                        <TablePagination
                            totalPage={meta?.totalPage}
                            restQuery={restQuery}
                            meta={meta}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
