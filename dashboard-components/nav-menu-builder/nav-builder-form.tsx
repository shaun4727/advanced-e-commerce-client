'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { navigationFormSchema, TNavigationForm } from '@/types/navItems';
import { zodResolver } from '@hookform/resolvers/zod';
import { SortableTree } from 'dnd-kit-sortable-tree';
import { useForm } from 'react-hook-form';
import { MinimalTreeItemComponent } from './minimal-tree-item-container';

export default function NavMenuBuilder() {
    // 1. Initialize Form
    const form = useForm<TNavigationForm>({
        resolver: zodResolver(navigationFormSchema),
        defaultValues: {
            menuName: 'Main Navigation',
            items: [],
        },
    });

    // Watch the items so the UI re-renders when the tree changes
    const menuItems = form.watch('items');

    const addManualItem = () => {
        const title = form.getValues('tempTitle');
        const url = form.getValues('tempUrl');

        if (!title) return;

        const newItem = {
            id: Date.now().toString(),
            title,
            url: url || '#',
            type: 'link',
            children: [],
        };

        form.setValue('items', [...menuItems, newItem]);
        form.setValue('tempTitle', ''); // Clear local form inputs
        form.setValue('tempUrl', '');
    };

    const handleCategoryToggle = (cat: any) => {
        const exists = menuItems.find((i) => i.id === cat.id);
        if (exists) {
            form.setValue(
                'items',
                menuItems.filter((i) => i.id !== cat.id),
            );
        } else {
            form.setValue('items', [
                ...menuItems,
                {
                    id: cat.id,
                    title: cat.name,
                    type: 'category',
                    category: cat.id,
                    children: [],
                },
            ]);
        }
    };

    const onSubmit = (data: TNavigationForm) => {
        console.log('Submitting to DB:', data);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Menu Meta Data */}
                <div className="max-w-xs">
                    <FormField
                        control={form.control}
                        name="menuName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Menu Name</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* LEFT COLUMN: FORMS */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-sm">
                                    Add Custom Link
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <Input
                                    placeholder="Item Label"
                                    {...form.register('tempTitle')}
                                />
                                <Input
                                    placeholder="URL"
                                    {...form.register('tempUrl')}
                                />
                                <Button
                                    type="button"
                                    onClick={addManualItem}
                                    className="w-full"
                                >
                                    Add to Menu
                                </Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-sm">
                                    Quick Add Categories
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* Replace with real map */}
                                {[{ id: '1', name: 'Electronics' }].map(
                                    (cat) => (
                                        <div
                                            key={cat.id}
                                            className="flex items-center space-x-2"
                                        >
                                            <Checkbox
                                                id={cat.id}
                                                onCheckedChange={() =>
                                                    handleCategoryToggle(cat)
                                                }
                                                checked={menuItems.some(
                                                    (i) => i.id === cat.id,
                                                )}
                                            />
                                            <Label htmlFor={cat.id}>
                                                {cat.name}
                                            </Label>
                                        </div>
                                    ),
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* RIGHT COLUMN: THE TREE BUILDER */}
                    <div className="md:col-span-2">
                        <Card className="min-h-[500px]">
                            <CardHeader>
                                <CardTitle>Menu Structure</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {menuItems.length === 0 ? (
                                    <div className="text-center py-20 border-2 border-dashed rounded-lg text-muted-foreground">
                                        No items added yet.
                                    </div>
                                ) : (
                                    <SortableTree
                                        items={menuItems}
                                        onItemsChanged={(newItems) =>
                                            form.setValue('items', newItems)
                                        }
                                        TreeItemComponent={
                                            MinimalTreeItemComponent as any
                                        }
                                    />
                                )}
                            </CardContent>
                        </Card>

                        <div className="mt-4 flex justify-end">
                            <Button type="submit" size="lg">
                                Save Menu Configuration
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </Form>
    );
}
