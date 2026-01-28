import { z } from 'zod';

export interface INavItem {
    title: string; // Display name (e.g., "Men's Fashion")
    url?: string; // Custom URL if not a category
    category?: string; // Reference to your ICategory
    type: 'link' | 'category' | 'mega-menu';
    children: INavItem[]; // The nested tree structure
    isOpenNewTab: boolean;
}

export interface INavigation extends Document {
    menuName: string; // e.g., "Main Header"
    items: INavItem[];
    isActive: boolean;
}

// 1. Internal Recursive Schema
// We use z.ZodType<any> here to allow recursion,
// but we won't pass THIS directly to the resolver.
export const navItemInternalSchema: z.ZodType<any> = z.lazy(() =>
    z.object({
        title: z.string().min(1, 'Title is required'),
        url: z.string().optional().or(z.literal('')),
        category: z.string().optional(),
        type: z.string(),
        isOpenNewTab: z.boolean().default(false),
        children: z.array(navItemInternalSchema).default([]),
    }),
);

// 2. THE FORM SCHEMA (The one passed to zodResolver)
// This is NOT recursive at the top level, so TS can validate the object keys.
export const navigationFormSchema = z.object({
    menuName: z.string().min(1, 'Menu name is required'),
    items: z.array(navItemInternalSchema),
    // Add these for UI state only
    tempTitle: z.string().optional(),
    tempUrl: z.string().optional(),
});
// 3. Types
export type TNavigationForm = z.infer<typeof navigationFormSchema>;

// Infer the TypeScript type from the Zod schema
export type TNavItem = z.infer<typeof navItemInternalSchema>;
