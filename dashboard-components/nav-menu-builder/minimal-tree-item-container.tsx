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
    arrayMove,
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
                { id: '11', content: 'nested item 1' },
                { id: '12', content: 'nested item 2' },
            ],
        },
        { id: '4', content: 'Item 4' },
        { id: '5', content: 'Item 5' },
    ]);
    const [activeId, SetActiveId] = useState<UniqueIdentifier | null>(null);
    const mouseSensor = useSensor(MouseSensor);
    const touchSensor = useSensor(TouchSensor);
    const keyboardSensor = useSensor(KeyboardSensor);

    const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);

    const handleDragStart = (event: DragStartEvent) => {
        SetActiveId(event.active.id);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        SetActiveId(null);
        const { active, over } = event;

        if (!over || active.id === over.id) return;

        setItems((items) => {
            const oldIndex = items.findIndex((item) => item.id === active.id);
            const newIndex = items.findIndex((item) => item.id === over.id);

            // This returns a new array with the item moved to the new position
            return arrayMove(items, oldIndex, newIndex);
        });
    };

    const getActiveItem = () => {
        return items.find((item) => item.id === activeId)?.content;
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
                                key={menu.id}
                                id={menu.id}
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
                                    {getActiveItem()}
                                </span>
                            </div>
                        </div>
                    ) : null}
                </DragOverlay>
            </DndContext>
        </div>
    );
}
