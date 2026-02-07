'use client';

import {
    SortableTreeProps,
    TreeItemComponentProps,
    TreeItems,
} from 'dnd-kit-sortable-tree';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';

interface MyNavItem {
    id: string;
    value: string;
    children?: MyNavItem[];
}

// Cast with two type arguments: <Data, Element>
const SortableTree = dynamic(
    () => import('dnd-kit-sortable-tree').then((mod) => mod.SortableTree),
    { ssr: false },
) as <TData extends MyNavItem, TElement extends HTMLElement = HTMLDivElement>(
    props: SortableTreeProps<TData, TElement>,
) => React.ReactElement; // Change JSX.Element to React.ReactElement

const initialItems: MyNavItem[] = [
    { id: '1', value: 'Home' },
    {
        id: '2',
        value: 'Services',
        children: [{ id: '2-1', value: 'Web Design' }],
    },
];

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
                marginLeft: `${depth * 20}px`,
            }}
            {...rest}
        >
            {item.value}
        </div>
    );
});

MinimalTreeItemComponent.displayName = 'MinimalTreeItemComponent';

export default function Page() {
    const [items, setItems] = useState<TreeItems<MyNavItem>>(initialItems);

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
