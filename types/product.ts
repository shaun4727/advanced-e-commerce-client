import * as z from 'zod';
import { IUser } from './user';

type Specification = {
    processor: string;
    ram: string;
    storage: string;
    display: string;
};

export interface IProduct {
    _id: string;
    name: string;
    quantity: number;
    description: string;
    price: number;
    stock: number;
    weight: number;
    category:
        | {
              _id: string;
              name: string;
          }
        | string;
    imageUrls: string[];
    isActive: boolean;
    shop: {
        _id: string;
        shopName: string;
    };
    brand: {
        _id: string;
        name: string;
    };
    averageRating: number;
    ratingCount: number;
    availableColors: string[];
    specification: Specification;
    keyFeatures: string[];
    slug: string;
    createdAt: string;
    updatedAt: string;
    offerPrice: number;
    orderQuantity?: number;
}

export interface IStep {
    id: number;
    title: string;
    subtitle: string;
    icon: string; // Specific type for Lucide icons
    completed: boolean;
    active: boolean;
}

export interface IAgentOrder {
    _id: string;
    orderId: string;
    destination: {
        area: string;
        city: string;
        zip_code: string;
        street_or_building_name: string;
    };
    agentId: string | IUser;
    status: 'Picked' | 'Delivered' | 'Assigned';
    createdAt: string;
    updatedAt: string;
}

export const productSchema = z.object({
    name: z.string().min(3, 'Product name must be at least 3 characters'),
    description: z
        .string()
        .min(10, 'Description must be at least 10 characters'),
    price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
        message: 'Price must be a positive number',
    }),
    category: z.string().min(1, 'Please select a category'),
    brand: z.string().min(1, 'Please select a brand'),
    stock: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
        message: 'Stock cannot be negative',
    }),
    weight: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
        message: 'Weight must be a positive number',
    }),
    availableColors: z.array(
        z.object({ value: z.string().min(1, 'Color name is required') }),
    ),
    keyFeatures: z.array(
        z.object({
            value: z.string().min(1, 'Feature description is required'),
        }),
    ),
    specification: z.array(
        z.object({
            key: z.string().min(1, 'Feature name is required'),
            value: z.string().min(1, 'Value is required'),
        }),
    ),
});
