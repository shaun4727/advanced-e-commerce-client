import { navSubItem } from '@/types/navItems';
import React from 'react';

export const renderNavItem = (
    item: navSubItem,
    level: number = 0,
    setSelectedItem: (item: any) => void,
    selectedNavItem: navSubItem | undefined,
) => {
    // Check if this specific item is the one currently selected
    const isActive = selectedNavItem?._id === item._id;

    return (
        <React.Fragment key={item._id}>
            <div
                className={`group flex items-center justify-between p-4 cursor-pointer transition-all duration-150 border-l-4 ${
                    isActive
                        ? 'bg-black text-white border-black' // Active State: Solid Black
                        : 'bg-white text-black border-transparent hover:bg-zinc-100' // Inactive State
                }`}
                style={{ paddingLeft: `${level * 1.5 + 1}rem` }}
                onClick={() => setSelectedItem(item)}
            >
                <div className="flex items-center space-x-3">
                    {level > 0 && (
                        <span
                            className={`font-mono text-xs ${isActive ? 'text-zinc-500' : 'text-zinc-300'}`}
                        >
                            └─
                        </span>
                    )}
                    <div className="flex flex-col">
                        <span
                            className={`text-sm uppercase tracking-tight ${
                                level === 0 ? 'font-black' : 'font-medium'
                            }`}
                        >
                            {item.data.title}
                        </span>
                        {item.children?.length > 0 && (
                            <span
                                className={`text-[8px] uppercase font-mono ${isActive ? 'opacity-70' : 'opacity-40'}`}
                            >
                                {item.children.length} Sub-items
                            </span>
                        )}
                    </div>
                </div>

                {/* Visual Indicator Box */}
                <div
                    className={`h-4 w-4 border flex items-center justify-center transition-colors ${
                        isActive ? 'border-white' : 'border-black'
                    }`}
                >
                    <div
                        className={`h-1.5 w-1.5 ${isActive ? 'bg-white' : 'bg-black'}`}
                    />
                </div>
            </div>

            {/* Recursively render children */}
            {item.children && item.children.length > 0 && (
                <div className={isActive ? 'bg-zinc-900' : 'bg-zinc-50/50'}>
                    {item.children.map((child: any) =>
                        renderNavItem(
                            child,
                            level + 1,
                            setSelectedItem,
                            selectedNavItem,
                        ),
                    )}
                </div>
            )}
        </React.Fragment>
    );
};
