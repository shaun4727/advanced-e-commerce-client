'use client';

import { SortableTree, TreeItemComponentProps } from 'dnd-kit-sortable-tree';
import React, { useState } from 'react';

// 1. Define your item type
interface MyNavItem {
    id: string;
    value: string;
    children?: MyNavItem[];
}

const initialItems: MyNavItem[] = [
    { id: '1', value: 'Home' },
    {
        id: '2',
        value: 'Services',
        children: [{ id: '2-1', value: 'Web Design' }],
    },
];

// 2. Create a typed component for the tree items
const MinimalTreeItemComponent = React.forwardRef<
    HTMLDivElement,
    TreeItemComponentProps<MyNavItem>
>((props, ref) => {
    const { item, depth, style, ...rest } = props;

    return (
        <div
            ref={ref}
            style={{
                ...style,
                padding: '10px',
                border: '1px solid #ddd',
                marginBottom: '5px',
                backgroundColor: 'white',
                cursor: 'grab',
                borderRadius: '4px',
                marginLeft: `${depth * 20}px`, // Visual nesting
            }}
            {...rest} // Necessary for dnd-kit event listeners
        >
            {item.value}
        </div>
    );
});

// Set a display name for debugging
MinimalTreeItemComponent.displayName = 'MinimalTreeItemComponent';

export default function page() {
    const [items, setItems] = useState<MyNavItem[]>(initialItems);

    return (
        <div style={{ padding: '40px', maxWidth: '600px' }}>
            <SortableTree
                items={items}
                onItemsChanged={setItems}
                TreeItemComponent={MinimalTreeItemComponent}
            />
        </div>
    );
}
