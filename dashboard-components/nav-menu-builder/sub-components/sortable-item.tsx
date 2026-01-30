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
        isOver, // Useful for visual feedback when nesting
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
            style={style}
            // Removed listeners from here to avoid parent/child click conflicts
            className={`list-none my-2 ${isDragging ? 'z-50' : 'z-0'}`}
        >
            <div
                className={`flex items-center gap-3 rounded-md border bg-white p-3 shadow-sm transition-colors 
                ${isDragging ? 'opacity-50' : 'opacity-100'} 
                ${isOver ? 'border-blue-500 bg-blue-50' : 'dark:border-gray-700 dark:bg-gray-800'}`}
            >
                {/* DRAG HANDLE: Move listeners here for precise control */}
                <button
                    {...attributes}
                    {...listeners}
                    className="cursor-grab touch-none p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                >
                    <span className="text-gray-500 dark:text-gray-400">⋮⋮</span>
                </button>

                <span className="dark:text-gray-200 select-none flex-1">
                    {content}
                </span>
            </div>

            {/* NESTED DROP ZONE */}
            {/* We render the container even if childrenItems is empty to allow for nesting */}
            <div
                className={`ml-8 mt-2 border-l-2 border-dashed border-gray-100 pl-4 transition-all
                ${childrenItems.length === 0 ? 'h-1 py-1' : 'h-auto'} 
                dark:border-gray-700`}
            >
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
        </li>
    );
};
