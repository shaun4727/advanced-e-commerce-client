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
import { TreeItems } from '@/lib/sortable-tree-utilites';
import {
    createNavigationApi,
    getNavigationApi,
} from '@/services/NavmenuService';
import { navigationFormSchema, TNavigationForm } from '@/types/navItems';
import { zodResolver } from '@hookform/resolvers/zod';
import { SetStateAction, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { MinimalTreeItemComponent } from './minimal-tree-item-container';

export default function NavMenuBuilder() {
    const [navigationMenu, setNavigationMenu] = useState<
        TreeItems[] | undefined
    >();

    const [navMenu, setNavMenu] = useState<TNavigationForm | undefined>(
        undefined,
    );

    const form = useForm<TNavigationForm>({
        resolver: zodResolver(navigationFormSchema),
        defaultValues: {
            menuName: '',
            items: [],
        },
    });

    const menuItems = form.watch('items');
    const menuNameValue = form.watch('menuName');

    /* ------------------ ADD MANUAL LINK ------------------ */
    const addManualItem = () => {
        const title = form.getValues('tempTitle');
        const url = form.getValues('tempUrl');

        if (!title) return;

        const newItem = {
            id: Date.now().toString(),
            data: {
                title,
                url: url || '#',
                type: 'link',
                category: [],
            },
            children: [],
        };

        setNavigationMenu((prevMenus) => {
            // If prevMenus is undefined or empty, start with the new item in an array
            if (!prevMenus) return [newItem];

            // Correct array spread syntax
            return [...prevMenus, newItem];
        });

        // Also updating the local form state as you were doing
        // form.setValue('items', [...menuItems, newItem]);
    };

    /* ------------------ CATEGORY TOGGLE ------------------ */
    const handleCategoryToggle = (cat: any) => {
        const exists = menuItems.find((i) => i.id === cat.id);

        if (exists) {
            form.setValue(
                'items',
                menuItems.filter((i) => i.id !== cat._id),
            );
        } else {
            form.setValue('items', [
                ...menuItems,
                {
                    id: cat.id,
                    data: {
                        title: cat.data.title,
                        type: 'category',
                        category: [],
                    },
                    children: [],
                },
            ]);
        }
    };

    /* ------------------ LOAD EXISTING MENU ------------------ */
    useEffect(() => {
        const getNavigationMenu = async () => {
            try {
                const res = await getNavigationApi();
                if (res.success) {
                    const navMenu = res.data;

                    const nav = navMenu?.find(
                        (nav: TNavigationForm) =>
                            nav.menuName === 'Main Navigation',
                    );

                    if (nav) {
                        setNavMenu(nav);
                    } else {
                        setNavMenu(undefined);
                    }
                }
            } catch (err) {
                console.error(err);
            }
        };

        getNavigationMenu();
    }, []);

    /* ------------------ SUBMIT ------------------ */
    const onSubmit = async (data: TNavigationForm) => {
        try {
            const res = await createNavigationApi(data);
            form.reset();
            res.success ? toast.success(res.message) : toast.error(res.message);
        } catch (err) {
            console.error(err);
        }
    };

    const handleTreeUpdate = (
        update: SetStateAction<TreeItems[] | undefined>,
    ) => {
        // 1. Calculate the new value
        // Since 'update' can be a function (prev => ...) or a direct value, we handle both
        const newValue =
            typeof update === 'function' ? update(menuItems) : update;

        // 2. Update the React Hook Form state
        // This triggers a re-render because 'menuItems' is being watched
        form.setValue('items', newValue || [], {
            shouldValidate: true,
            shouldDirty: true,
        });
    };

    return (
        <>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    {/* MENU META */}
                    <div className="max-w-xs">
                        <FormField
                            control={form.control}
                            name="menuName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Menu Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Enter Menu name"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* LEFT */}
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
                                    <div className="flex justify-between">
                                        <h1 className="font-bold">
                                            {menuNameValue}
                                        </h1>
                                        {/* Delete Button */}
                                    </div>

                                    {navigationMenu &&
                                        navigationMenu?.map((cat) => (
                                            <div
                                                key={cat.id}
                                                className="flex items-center space-x-2 group" // added group for hover effects
                                            >
                                                <Checkbox
                                                    id={cat._id}
                                                    onCheckedChange={() =>
                                                        handleCategoryToggle(
                                                            cat,
                                                        )
                                                    }
                                                    checked={menuItems.some(
                                                        (i) => i.id === cat.id,
                                                    )}
                                                />

                                                <Label
                                                    htmlFor={cat.id}
                                                    className="flex-1 cursor-pointer"
                                                >
                                                    {cat.data.title}
                                                </Label>
                                            </div>
                                        ))}
                                </CardContent>
                            </Card>
                        </div>

                        {/* RIGHT */}
                        <div className="md:col-span-2">
                            <Card className="min-h-[500px]">
                                <CardHeader>
                                    <CardTitle>Menu Structure</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {menuItems && menuItems.length === 0 ? (
                                        <div className="text-center py-20 border-2 border-dashed rounded-lg text-muted-foreground">
                                            No items added yet.
                                        </div>
                                    ) : (
                                        <MinimalTreeItemComponent
                                            menuItems={menuItems}
                                            setMenuItems={handleTreeUpdate}
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
        </>
    );
}
