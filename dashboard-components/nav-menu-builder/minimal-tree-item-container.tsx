import { TreeItemComponentProps } from 'dnd-kit-sortable-tree';
import React from 'react';

interface NavItemData {
    id: string;
    title: string;
}

const MinimalTreeItemInner = React.forwardRef<
    HTMLDivElement,
    TreeItemComponentProps<NavItemData>
>((props, ref) => {
    console.log('props', props);
    const {
        // 1. DATA PROPS
        item,
        depth,
        style,

        // 2. STATE PROPS (Swallow these to prevent DOM warnings)
        childCount = 0,
        clone,
        active,
        indentationWidth,
        path,
        isOpen,
        collapsed,
        isLast,
        wrapperRef,
        handleProps,
        disableSorting,
        isOver,
        isOverParent,
        showDragHandle,
        disableInteraction,
        disableSelection,
        ghost,

        // 3. EVENT HANDLER PROPS (Swallow these too)
        onCollapse,
        onRemove,

        // 4. THE REST (Valid DOM attributes + Drag listeners)
        ...rest
    } = props;

    return (
        <div
            ref={ref}
            style={{
                ...style,
                marginLeft: `${depth * 20}px`,
            }}
            // 'rest' now only contains standard attributes (id, tabIndex)
            // and drag-and-drop listeners (onPointerDown, etc.)
            {...rest}
            className={`p-2 border rounded mb-1 cursor-pointer transition-colors shadow-sm flex items-center justify-between 
                ${active ? 'bg-slate-100 border-primary' : 'bg-white hover:bg-slate-50'}`}
        >
            <div className="flex items-center gap-2">
                {/* Visual feedback for collapsed state */}
                {childCount > 0 && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent selecting the item when toggling
                            onCollapse?.();
                        }}
                        className="p-1 hover:bg-slate-200 rounded text-[10px]"
                    >
                        {collapsed ? '▶' : '▼'}
                    </button>
                )}

                <span className="text-sm font-medium">{item.title}</span>

                {childCount > 0 && (
                    <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded-full text-slate-500 font-bold">
                        {childCount}
                    </span>
                )}
            </div>
        </div>
    );
});

MinimalTreeItemInner.displayName = 'MinimalTreeItemInner';

export const MinimalTreeItemComponent = MinimalTreeItemInner as React.FC<
    TreeItemComponentProps<NavItemData>
>;
