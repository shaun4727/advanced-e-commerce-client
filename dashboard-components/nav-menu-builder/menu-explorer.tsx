'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { deleteNavigationApi } from '@/services/NavmenuService';
import { ICategory } from '@/types';
import { navSubItem, TNavigationForm } from '@/types/navItems';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { renderNavItem } from './sub-components/render-nav-items';

export const MenuExplorer = ({
    navMenu,
    categories,
}: {
    navMenu: TNavigationForm;
    categories: ICategory[];
}) => {
    const router = useRouter();

    const [selectedNavItem, setSelectedNavItem] = useState<
        navSubItem | undefined
    >(undefined);
    const [selectedCatIds, setSelectedCatIds] = useState<string[]>([]);

    const handleDeleteCategory = async (menuId: string) => {
        try {
            if (menuId == '1') {
                return;
            }
            const res = await deleteNavigationApi(menuId);
            if (res.success) {
                toast.success(res.message);
                router.refresh();
            } else {
                toast.error(res.message);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const setSelectedItem = (item: navSubItem) => {
        setSelectedNavItem(item);
        // Automatically check the boxes that this item already has saved
        setSelectedCatIds(item.data.category || []);
    };

    const handleToggleCategory = (catId: string) => {
        setSelectedCatIds(
            (prev) =>
                prev.includes(catId)
                    ? prev.filter((id) => id !== catId) // Remove if exists
                    : [...prev, catId], // Add if not exists
        );
    };

    // 4. Log or Save
    const updateCategories = () => {
        console.log('Selected Categories for Target:', selectedCatIds);
        // Here you would call your recursive update function to update the navMenu
    };
    return (
        <div>
            {/* PREVIEW SECTION */}
            <div className="mt-12 pt-12 border-t border-zinc-200">
                <div className="mb-6 flex justify-between items-end">
                    <div>
                        <h2 className="text-2xl font-black uppercase tracking-tighter">
                            Menu Explorer
                        </h2>
                        <p className="text-[10px] text-zinc-400 font-mono uppercase tracking-widest">
                            Preview Mode / Studio View
                        </p>
                    </div>
                </div>

                <Card className="overflow-hidden border-2 border-black rounded-none shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                    <div className="grid grid-cols-1 md:grid-cols-12 min-h-[500px]">
                        {/* LEFT: Menu Items List (White Section) */}
                        {/* LEFT: Interactive Item List (Span 4) */}
                        <div className="md:col-span-4 bg-white border-r-2 border-black overflow-y-auto max-h-[600px]">
                            <div className="flex justify-between sticky top-0 bg-white border-b-2 border-black p-4 z-10">
                                <span className="text-[10px] font-black uppercase tracking-widest flex items-center">
                                    <span className="mr-2 h-2 w-2 bg-black"></span>
                                    {navMenu?.menuName}
                                </span>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-muted-foreground hover:text-destructive transition-colors"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleDeleteCategory(
                                            navMenu?._id as string,
                                        );
                                    }}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>

                            <div className="divide-y divide-zinc-100">
                                {navMenu?.items && navMenu.items.length > 0 ? (
                                    navMenu.items.map((nav, index) =>
                                        renderNavItem(
                                            nav,
                                            0,
                                            setSelectedItem,
                                            selectedNavItem,
                                        ),
                                    )
                                ) : (
                                    <div className="p-10 text-center text-zinc-300 italic text-xs uppercase font-mono">
                                        No items in tree
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* RIGHT: Categories Grid (3-Column Layout) */}
                        <div className="md:col-span-8 bg-zinc-50 flex flex-col h-[600px]">
                            {/* Sticky Header */}
                            <div className="flex justify-between items-center p-6 bg-zinc-50 border-b-2 border-black sticky top-0 z-10">
                                <div>
                                    <h3 className="text-xs font-black uppercase tracking-[0.2em]">
                                        Select Categories
                                    </h3>
                                    <p className="text-[9px] text-zinc-400 font-mono mt-1">
                                        Populate menu item data
                                    </p>
                                </div>
                                <span className="text-[10px] font-mono bg-black text-white px-2 py-0.5">
                                    {categories?.length || 0} TOTAL
                                </span>
                            </div>

                            {/* Scrollable Grid Area */}
                            <div className="p-6 overflow-y-auto custom-scrollbar">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                    {categories?.map((cat) => (
                                        <div
                                            key={cat._id}
                                            className="relative flex items-center p-3 bg-white border border-zinc-200 hover:border-black transition-all group cursor-pointer hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                                        >
                                            {/* Compact Icon */}
                                            <div className="mr-3 h-8 w-8 shrink-0 grayscale group-hover:grayscale-0 transition-all opacity-70 group-hover:opacity-100">
                                                <img
                                                    src={cat.icon || ''}
                                                    alt={cat.slug}
                                                    className="h-full w-full object-contain"
                                                />
                                            </div>

                                            {/* Text Data */}
                                            <div className="flex-1 min-w-0 pr-6">
                                                <p className="text-[10px] font-extrabold uppercase truncate tracking-tighter leading-tight">
                                                    {cat.name}
                                                </p>
                                                <p className="text-[8px] text-zinc-400 truncate font-mono">
                                                    /{cat.slug}
                                                </p>
                                            </div>

                                            {/* Precise Checkbox Placement */}
                                            <div className="absolute right-2">
                                                <Checkbox
                                                    id={cat._id}
                                                    checked={selectedCatIds.includes(
                                                        cat._id,
                                                    )}
                                                    onCheckedChange={() =>
                                                        handleToggleCategory(
                                                            cat._id,
                                                        )
                                                    }
                                                    className="h-3.5 w-3.5 rounded-none border-zinc-300 data-[state=checked]:border-black data-[state=checked]:bg-black data-[state=checked]:text-white transition-colors"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Footer Info */}
                            <div className="mt-auto p-4 bg-white border-t border-zinc-200 text-right">
                                <span className="text-[9px] font-mono text-zinc-400 uppercase">
                                    Scroll for more categories ↓
                                </span>
                            </div>
                        </div>
                    </div>
                </Card>
                {/* NEW ACTION FOOTER */}
                <div className="mt-auto p-4 bg-white border-t-2 border-black flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-3">
                        <div
                            className={`h-8 w-8 border-2 border-black flex items-center justify-center ${selectedNavItem ? 'bg-black text-white' : 'bg-zinc-100'}`}
                        >
                            <span className="text-[10px] font-bold">#</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black uppercase tracking-widest">
                                Target Item
                            </span>
                            <span className="text-[10px] font-mono text-zinc-500 truncate max-w-[150px]">
                                {selectedNavItem
                                    ? selectedNavItem.data.title
                                    : 'No item selected'}
                            </span>
                        </div>
                    </div>

                    <Button
                        disabled={!selectedNavItem}
                        onClick={() => updateCategories()}
                        className="w-full cursor-pointer sm:w-auto rounded-none bg-black text-white hover:bg-zinc-800 uppercase text-[11px] font-black px-8 py-6 tracking-[0.2em] shadow-[4px_4px_0px_0px_rgba(161,161,170,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all"
                    >
                        Update Categories
                    </Button>
                </div>
            </div>
        </div>
    );
};
