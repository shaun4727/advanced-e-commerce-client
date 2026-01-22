export interface ICategory {
    _id: string;
    name: string;
    description: string;
    parent: string | null;
    isActive: boolean;
    createdBy: string;
    icon: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    children: ICategory[];
}

export interface Category {
    id: string;
    name: string;
    icon: React.ReactNode;
    href: string;
    count?: number;
}
