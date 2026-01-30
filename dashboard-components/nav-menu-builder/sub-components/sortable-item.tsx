import { UniqueIdentifier } from '@dnd-kit/core';
import {
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';

interface recItems {
    id: string;
    content: string;
    children?: recItems[];
}

export const SortableItem = ({
    id,
    content,
    childrenItems,
}: {
    id: UniqueIdentifier;
    content: string;
    childrenItems: recItems[];
}) => {
    const {
        setNodeRef,
        listeners,
        attributes,
        transform,
        transition,
        isDragging,
    } = useSortable({ id });

    const style = {
        transform: transform
            ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
            : undefined,
        transition,
    };

    return (
        <li
            ref={setNodeRef}
            key={id}
            style={style}
            {...listeners}
            {...attributes}
            className={`cursor-grab touch-none rounded-md border bg-white p-3 active:cursor-grabbing ${isDragging ? 'z-10 opacity-50 shadow-md' : 'dark:border-gray-700 dark:bg-gray-800'} `}
        >
            <div className="flex items-center gap-3">
                <span className="text-gray-500 dark:text-gray-400">⋮⋮</span>
                <span className="dark:text-gray-200">{content}</span>
            </div>

            {/* Render Children Recursively */}
            {childrenItems.length > 0 && (
                <div className="ml-8 mt-2 border-l-2 border-gray-200 pl-4">
                    <SortableContext
                        items={childrenItems.map((child) => child.id)}
                        strategy={verticalListSortingStrategy}
                    >
                        <ul className="space-y-2">
                            {childrenItems.map((child) => (
                                <SortableItem
                                    key={child.id}
                                    id={child.id}
                                    content={child.content}
                                    childrenItems={child.children || []}
                                />
                            ))}
                        </ul>
                    </SortableContext>
                </div>
            )}
        </li>
    );
};
