'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SortableTree } from 'dnd-kit-sortable-tree';
import { useState } from 'react';
import { MinimalTreeItemComponent } from './minimal-tree-item-container';

export default function MegaMenuManager() {
    // 1. State for the Menu Tree
    const [items, setItems] = useState<any[]>([
        { id: '1', title: 'Main Shop', type: 'link', children: [] },
        { id: '2', title: 'Featured', type: 'link', children: [] },
    ]);

    // 2. State for Selection
    const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

    // 3. Mock Categories (In a real app, fetch these from your MongoDB)
    const availableCategories = [
        { id: 'cat_electronics', name: 'Electronics' },
        { id: 'cat_fashion', name: 'Fashion' },
        { id: 'cat_home', name: 'Home Decor' },
        { id: 'cat_beauty', name: 'Beauty & Care' },
    ];

    // Helper to find and update a specific item deep in the tree
    const updateItemInTree = (
        list: any[],
        id: string,
        category: any,
    ): any[] => {
        return list.map((item) => {
            if (item.id === id) {
                const isAlreadyAdded = item.children.some(
                    (child: any) => child.category === category.id,
                );

                if (isAlreadyAdded) {
                    // Remove if unchecked
                    return {
                        ...item,
                        children: item.children.filter(
                            (c: any) => c.category !== category.id,
                        ),
                    };
                } else {
                    // Add as a new child
                    return {
                        ...item,
                        children: [
                            ...item.children,
                            {
                                id: `nav-${category.id}`,
                                title: category.name,
                                type: 'category',
                                category: category.id,
                                children: [],
                            },
                        ],
                    };
                }
            }
            if (item.children) {
                return {
                    ...item,
                    children: updateItemInTree(item.children, id, category),
                };
            }
            return item;
        });
    };

    const handleToggleCategory = (category: any) => {
        if (!selectedItemId) return;
        const newItems = updateItemInTree(items, selectedItemId, category);
        setItems(newItems);
    };

    // Get current selected item to show active checkboxes
    const findItem = (list: any[], id: string): any => {
        for (const item of list) {
            if (item.id === id) return item;
            if (item.children) {
                const found = findItem(item.children, id);
                if (found) return found;
            }
        }
        return null;
    };

    const selectedItem = selectedItemId
        ? findItem(items, selectedItemId)
        : null;

    return (
        <div className="p-6 max-w-6xl mx-auto space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold italic">
                    Menu Category Mapper
                </h1>
                <Button onClick={() => console.log('Final Payload:', items)}>
                    Save Mega Menu
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* LEFT: THE TREE SELECTOR */}
                <Card>
                    <CardHeader>
                        <CardTitle>1. Select Menu Item</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="border rounded-lg p-2 bg-slate-50 dark:bg-slate-900">
                            <SortableTree
                                items={items}
                                onItemsChanged={setItems}
                                TreeItemComponent={(props) => (
                                    <div
                                        onClick={() =>
                                            setSelectedItemId(props.item.id)
                                        }
                                        className={
                                            selectedItemId === props.item.id
                                                ? 'ring-2 ring-primary rounded'
                                                : ''
                                        }
                                    >
                                        <MinimalTreeItemComponent {...props} />
                                    </div>
                                )}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* RIGHT: CATEGORY CHECKBOXES */}
                <Card className={!selectedItemId ? 'opacity-50 grayscale' : ''}>
                    <CardHeader>
                        <CardTitle className="flex justify-between">
                            2. Assign Categories
                            {selectedItem && (
                                <Badge variant="outline">
                                    {selectedItem.title}
                                </Badge>
                            )}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {!selectedItemId ? (
                            <div className="text-center py-20 text-muted-foreground">
                                Select an item on the left to map categories
                            </div>
                        ) : (
                            <ScrollArea className="h-[400px] pr-4">
                                <div className="space-y-4">
                                    {availableCategories.map((cat) => (
                                        <div
                                            key={cat.id}
                                            className="flex items-center space-x-3 p-3 border rounded-md hover:bg-slate-50 transition-colors"
                                        >
                                            <Checkbox
                                                id={cat.id}
                                                checked={selectedItem?.children?.some(
                                                    (c: any) =>
                                                        c.category === cat.id,
                                                )}
                                                onCheckedChange={() =>
                                                    handleToggleCategory(cat)
                                                }
                                            />
                                            <Label
                                                htmlFor={cat.id}
                                                className="flex-1 cursor-pointer font-medium"
                                            >
                                                {cat.name}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
