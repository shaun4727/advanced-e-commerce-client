'use client';

import {
    getChildCount,
    insertItemCheck,
    removeItem,
    TreeItems,
} from '@/lib/sortable-tree-utilites';
import {
    closestCenter,
    DndContext,
    DragEndEvent,
    KeyboardSensor,
    MouseSensor,
    PointerSensor,
    TouchSensor,
    useDroppable,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    SortableContext,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Dispatch, SetStateAction } from 'react';
import { SortableItem } from './sub-components/sortable-item';

export function MinimalTreeItemComponent({
    menuItems,
    setMenuItems,
}: {
    menuItems: TreeItems[] | undefined;
    setMenuItems: Dispatch<SetStateAction<TreeItems[] | undefined>>;
}) {
    const sensors = useSensors(
        useSensor(MouseSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor),
        useSensor(PointerSensor),
    );

    const isDescendant = (
        tree: TreeItems[] | undefined,
        parentId: string,
        id: string,
    ): boolean => {
        if (!tree) return false;
        for (const node of tree) {
            // If this node is the one we are moving, check its children for the target
            if (node.id === parentId && node.children) {
                return node.children.some(
                    (child) =>
                        child.id === id ||
                        isDescendant(child.children, parentId, id),
                );
            }
            // Recurse deeper
            if (node.children && node.children.length > 0) {
                if (isDescendant(node.children, parentId, id)) return true;
            }
        }
        return false;
    };

    const { setNodeRef } = useDroppable({
        id: 'root-background',
    });

    const handleDragEnd = ({ active, over }: DragEndEvent) => {
        if (!over) return;

        // Strip prefixes to get the raw ID matching your state
        const activeId = String(active.id).replace('item:', '');
        const overId = String(over.id);
        const targetId = overId.replace('nest:', '').replace('item:', '');

        if (activeId === targetId) return;

        setMenuItems((prev) => {
            // 1. Check for descendant circularity
            if (isDescendant(prev, activeId, targetId)) {
                console.warn('Cannot move a parent into its own child tree.');
                return prev;
            }

            // 2. Remove the item from its old position
            const { tree, item } = removeItem(prev as TreeItems[], activeId);
            if (!item) return prev;

            // 3. Insert into the root background
            if (overId === 'root-background') {
                return insertItemCheck(tree, null, tree.length, item);
            }

            // 4. Insert into the target (nesting)
            const index = getChildCount(tree, targetId);
            return insertItemCheck(tree, targetId, index, item);
        });
    };

    return (
        <div className="max-w-2xl mx-auto p-4 border rounded">
            <h2 className="font-bold mb-3">Draggable Menu Builder</h2>

            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={menuItems?.map((i) => `item:${i.id}`) || []}
                    strategy={verticalListSortingStrategy}
                >
                    <div ref={setNodeRef}>
                        <ul className="space-y-2">
                            {menuItems?.map((item) => (
                                <SortableItem key={item.id} item={item} />
                            ))}
                        </ul>
                    </div>
                </SortableContext>
            </DndContext>
        </div>
    );
}
