'use client';

interface menuItems {
    id: string;
    data: {
        title: string;
        url: string;
        type: string;
    };
    children: menuItems[];
}

import {
    closestCenter,
    DndContext,
    DragCancelEvent,
    DragEndEvent,
    DragOverlay,
    DragStartEvent,
    KeyboardSensor,
    MouseSensor,
    TouchSensor,
    UniqueIdentifier,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    SortableContext,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useState } from 'react';
import { SortableItem } from './sub-components/sortable-item';

interface recItems {
    id: string;
    content: string;
    children?: recItems[];
}

export function MinimalTreeItemComponent({
    menuItems,
}: {
    menuItems: menuItems[];
}) {
    const [items, setItems] = useState<
        {
            id: string;
            content: string;
            children?: recItems[];
        }[]
    >([
        {
            id: '1',
            content: 'Item 1',
            children: [
                { id: '11', content: 'nested item 1' },
                { id: '12', content: 'nested item 2' },
            ],
        },
        { id: '2', content: 'Item 2' },
        {
            id: '3',
            content: 'Item 3',
            children: [
                { id: '13', content: 'nested item 3' },
                { id: '14', content: 'nested item 4' },
            ],
        },
        { id: '4', content: 'Item 4' },
        { id: '5', content: 'Item 5' },
    ]);
    const [activeId, SetActiveId] = useState<UniqueIdentifier | null>(null);
    const [selectedDraggedItem, setSelectedDraggedItem] = useState<recItems>({
        id: '',
        content: '',
    });
    const mouseSensor = useSensor(MouseSensor);
    const touchSensor = useSensor(TouchSensor);
    const keyboardSensor = useSensor(KeyboardSensor);

    const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);

    const handleDragStart = (event: DragStartEvent) => {
        SetActiveId(event.active.id);

        items.forEach((nav) => getActiveItem(nav, event.active.id));
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        setItems((prev) => {
            let draggedItem: recItems | null = null;

            // 1. PLUCK: Remove the item from its current position
            const removeFromTree = (list: recItems[]): recItems[] => {
                return list.reduce((acc, item) => {
                    if (item.id === active.id) {
                        draggedItem = item;
                        return acc;
                    }
                    return [
                        ...acc,
                        {
                            ...item,
                            children: item.children
                                ? removeFromTree(item.children)
                                : [],
                        },
                    ];
                }, [] as recItems[]);
            };

            const cleanTree = removeFromTree(prev);
            if (!draggedItem) return prev;

            // 2. PLANT: Hybrid Insertion Logic
            const insertIntoTree = (list: recItems[]): recItems[] => {
                // Check if 'over' is a sibling at this specific level
                const overIndex = list.findIndex((i) => i.id === over.id);

                if (overIndex !== -1) {
                    const newList = [...list];
                    // Check if we want to nest inside 'over' or just be its neighbor.
                    // For simplicity: this puts it as a sibling.
                    newList.splice(overIndex + 1, 0, draggedItem!);
                    return newList;
                }

                // If not found at this level, check if any item HERE should be the PARENT
                return list.map((item) => {
                    if (item.id === over.id) {
                        return {
                            ...item,
                            children: [...(item.children || []), draggedItem!],
                        };
                    }
                    // Otherwise, recurse deeper
                    return {
                        ...item,
                        children: item.children
                            ? insertIntoTree(item.children)
                            : [],
                    };
                });
            };

            return insertIntoTree(cleanTree);
        });
    };

    const getActiveItem = (nav: recItems, activeID: UniqueIdentifier) => {
        const menus: recItems[] = [{ ...nav }];

        while (menus.length) {
            const nav = menus.pop();

            if (!nav) return;
            if (nav.id === activeID) {
                setSelectedDraggedItem(nav);
            }

            for (const subItem of nav.children || []) {
                if (subItem) {
                    menus.push(subItem);
                }
            }
        }
    };

    const handleDragCancel = (event: DragCancelEvent) => {
        void event;

        SetActiveId(null);
    };

    return (
        <div className="mx-auto w-full max-w-4xl rounded-lg border bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
            <h2 className="mb-4 text-xl font-bold dark:text-white">
                Sortable List
            </h2>

            <DndContext
                sensors={sensors}
                onDragEnd={handleDragEnd}
                onDragStart={handleDragStart}
                onDragCancel={handleDragCancel}
                collisionDetection={closestCenter}
            >
                <SortableContext
                    items={items.map((item) => item.id)}
                    strategy={verticalListSortingStrategy}
                >
                    <ul className="space-y-2 p-4">
                        {items.map((menu) => (
                            <SortableItem
                                id={menu.id}
                                key={menu.id}
                                content={menu.content}
                                childrenItems={menu.children || []} // Pass the nested array
                            />
                        ))}
                    </ul>
                </SortableContext>
                <DragOverlay
                    adjustScale={true}
                    dropAnimation={{
                        duration: 150,
                        easing: 'cubic-bezier(0.18,0.67,0.6,1.22)',
                    }}
                >
                    {activeId ? (
                        <div className="cursor-grabbing rounded-md border bg-blue-50 p-3 shadow-md dark:border-blue-800 dark:bg-blue-900/30">
                            <div className="flex items-center gap-3">
                                <span className="text-gray-500 dark:text-gray-400">
                                    ⋮⋮
                                </span>
                                <span className="dark:text-gray-200">
                                    {selectedDraggedItem?.content || ''}
                                </span>
                            </div>
                        </div>
                    ) : null}
                </DragOverlay>
            </DndContext>
        </div>
    );
}
