'use client';

import { TreeItem } from '@/lib/sortable-tree-utilites';
import { useDroppable } from '@dnd-kit/core';
import {
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export function SortableItem({ item }: { item: TreeItem }) {
    // SORTABLE (reorder)
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: `item:${item.id}`,
    });

    // DROPPABLE (nest)
    const { setNodeRef: setNestRef, isOver } = useDroppable({
        id: `nest:${item.id}`,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <li ref={setNodeRef} style={style} className="list-none">
            {/* ITEM BODY (NEST TARGET) */}
            <div
                ref={setNestRef}
                className={`flex items-center gap-2 rounded border p-2 mb-1 transition
                    ${isDragging ? 'opacity-50' : ''}
                    ${isOver ? 'bg-blue-100 border-blue-500' : 'bg-white'}
                `}
            >
                <button
                    {...attributes}
                    {...listeners}
                    className="cursor-grab px-2 text-gray-500"
                >
                    ⋮⋮
                </button>
                <span>{item.data.title}</span>
            </div>

            {/* CHILDREN */}
            {item.children && item.children.length > 0 && (
                <div className="ml-6 border-l pl-3">
                    <SortableContext
                        items={item.children.map((c) => `item:${c.id}`)}
                        strategy={verticalListSortingStrategy}
                    >
                        <ul className="space-y-1">
                            {item.children.map((child) => (
                                <SortableItem key={child.id} item={child} />
                            ))}
                        </ul>
                    </SortableContext>
                </div>
            )}
        </li>
    );
}
