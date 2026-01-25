'use client';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { EPTable } from '@/components/ui/core/EPTable';
import TablePagination from '@/components/ui/core/EPTable/TablePagination';
import { deleteProduct } from '@/services/ProductServices';
import { IMeta, IProduct } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { Edit, Plus, Trash } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import DiscountModal from './product-sub-components/DiscountModal';

const ManageProducts = ({
    products,
    meta,
}: {
    products: IProduct[];
    meta: IMeta;
}) => {
    const router = useRouter();
    const [selectedIds, setSelectedIds] = useState<string[] | []>([]);

    // const handleView = (product: IProduct) => {
    //     console.log('Viewing product:', product);
    // };

    const handleDelete = async (productId: string) => {
        try {
            const res = await deleteProduct(productId);

            if (res.success) {
                toast.success(res.message);
            } else {
                toast.error(res.message);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const columns: ColumnDef<IProduct>[] = [
        {
            id: 'select',
            header: ({ table }) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && 'indeterminate')
                    }
                    onCheckedChange={(value) =>
                        table.toggleAllPageRowsSelected(!!value)
                    }
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => {
                        if (value) {
                            setSelectedIds((prev) => [
                                ...prev,
                                row.original._id,
                            ]);
                        } else {
                            setSelectedIds(
                                selectedIds.filter(
                                    (id) => id !== row.original._id,
                                ),
                            );
                        }
                        row.toggleSelected(!!value);
                    }}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },

        {
            accessorKey: 'name',
            header: 'Product Name',
            cell: ({ row }) => (
                <div className="flex items-center space-x-3">
                    <Image
                        src={row.original.imageUrls[0]}
                        alt="product-image"
                        width={40}
                        height={40}
                        className="w-8 h-8 rounded-full"
                    />
                    <span className="truncate">{row.original.name}</span>
                </div>
            ),
        },
        {
            accessorKey: 'category',
            header: 'Category',
            cell: ({ row }) => (
                <span>
                    {typeof row.original.category === 'object'
                        ? row.original.category.name
                        : row.original.category}
                </span>
            ),
        },
        {
            accessorKey: 'brand',
            header: 'Brand',
            cell: ({ row }) => <span>{row.original.brand.name}</span>,
        },
        {
            accessorKey: 'stock',
            header: 'Stock',
            cell: ({ row }) => <span>{row.original.stock}</span>,
        },
        {
            accessorKey: 'price',
            header: 'Price',
            cell: ({ row }) => (
                <span> {Number(row.original.price).toFixed(2)}</span>
            ),
        },
        {
            accessorKey: 'offerPrice',
            header: 'Ofter Price',
            cell: ({ row }) => (
                <span>
                    {row.original.offerPrice
                        ? Number(row.original.offerPrice).toFixed(2)
                        : '0'}
                </span>
            ),
        },
        {
            accessorKey: 'action',
            header: 'Action',
            cell: ({ row }) => (
                <div className="flex items-center space-x-3">
                    {/* <button
                        className="text-gray-500 hover:text-blue-500"
                        title="View"
                        onClick={() => handleView(row.original)}
                    >
                        <Eye className="w-5 h-5" />
                    </button> */}

                    <button
                        className="text-gray-500 hover:text-green-500"
                        title="Edit"
                        onClick={() =>
                            router.push(
                                `/dashboard/shop/products/update-product/${row.original._id}`,
                            )
                        }
                    >
                        <Edit className="w-5 h-5" />
                    </button>

                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <button
                                className="text-gray-500 hover:text-red-500"
                                title="Delete"
                            >
                                <Trash className="w-5 h-5" />
                            </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Are you absolutely sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will
                                    permanently delete the product.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={() =>
                                        handleDelete(row.original._id)
                                    }
                                >
                                    Continue
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            ),
        },
    ];

    return (
        <div className="w-full p-6 space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
                <h1 className="text-2xl font-semibold tracking-tight">
                    Manage Products
                </h1>
                <div className="flex items-center gap-2">
                    <Button
                        onClick={() =>
                            router.push('/dashboard/shop/products/add-product')
                        }
                        size="sm"
                        className="flex items-center gap-2"
                    >
                        Add Product <Plus size={16} />
                    </Button>
                    <DiscountModal
                        selectedIds={selectedIds}
                        setSelectedIds={setSelectedIds}
                    />
                </div>
            </div>
            <EPTable columns={columns} data={products || []} />
            <TablePagination totalPage={meta?.totalPage} restQuery="" />
        </div>
    );
};

export default ManageProducts;
