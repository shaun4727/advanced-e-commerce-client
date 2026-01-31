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
    deleteNavigationApi,
    getNavigationApi,
} from '@/services/NavmenuService';
import { navigationFormSchema, TNavigationForm } from '@/types/navItems';
import { zodResolver } from '@hookform/resolvers/zod';
import { Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
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
        form.setValue('items', [...menuItems, newItem]);
    };

    /* ------------------ CATEGORY TOGGLE ------------------ */
    const handleCategoryToggle = (cat: any) => {
        const exists = menuItems.find((i) => i.id === cat._id);

        if (exists) {
            form.setValue(
                'items',
                menuItems.filter((i) => i.id !== cat._id),
            );
        } else {
            form.setValue('items', [
                ...menuItems,
                {
                    id: cat._id,
                    data: {
                        title: cat.title,
                        type: 'category',
                        category: cat._id,
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

                    navMenu?.find(
                        (nav: TNavigationForm) =>
                            nav.menuName === 'Main Navigation',
                    );
                    if (navMenu) {
                        setNavMenu(navMenu);
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
            console.log('data', menuItems, navigationMenu);
            const res = await createNavigationApi(data);
            res.success ? toast.success(res.message) : toast.error(res.message);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteCategory = async (menuId: string) => {
        try {
            if (menuId == '1') {
                setNavigationMenu([]);
                return;
            }
            const res = await deleteNavigationApi(menuId);
            if (res.success) {
                toast.success(res.message);
            } else {
                toast.error(res.message);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                                        value={'Main Navigation'}
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
                                {navMenu && (
                                    <div className="flex justify-between">
                                        <h1 className="font-bold">
                                            {navMenu?.menuName}
                                        </h1>
                                        {/* Delete Button */}
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-muted-foreground hover:text-destructive transition-colors"
                                            onClick={(e) => {
                                                e.preventDefault(); // Prevent checkbox toggle if nested
                                                handleDeleteCategory('1');
                                            }}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                )}

                                {navMenu &&
                                    navMenu.items?.map((cat) => (
                                        <div
                                            key={cat._id}
                                            className="flex items-center space-x-2 group" // added group for hover effects
                                        >
                                            <Checkbox
                                                id={cat._id}
                                                onCheckedChange={() =>
                                                    handleCategoryToggle(cat)
                                                }
                                                checked={menuItems.some(
                                                    (i) => i.id === cat._id,
                                                )}
                                            />

                                            <Label
                                                htmlFor={cat._id}
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
                                {navigationMenu &&
                                navigationMenu.length === 0 ? (
                                    <div className="text-center py-20 border-2 border-dashed rounded-lg text-muted-foreground">
                                        No items added yet.
                                    </div>
                                ) : (
                                    <MinimalTreeItemComponent
                                        menuItems={navigationMenu}
                                        setMenuItems={setNavigationMenu}
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
