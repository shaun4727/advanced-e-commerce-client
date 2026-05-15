export type catItem = {
    _id: string;
    name: string;
    description: string;
    icon: string;
    slug: string;
    // Added fields found in your JSON
    parent?: string | null;
    isActive: boolean;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
};

export type childData = {
    title: string;
    category: catItem[];
    type: string;
};

export type navItem = {
    _id: string;
    data: childData;
    isOpenNewTab: boolean;
    children: navItem[];
};
