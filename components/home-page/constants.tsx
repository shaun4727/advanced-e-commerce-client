import { Category } from '@/types';
import {
    BookText,
    Briefcase,
    HatGlasses,
    Pen,
    ShieldCheck,
    Shirt,
    Sword,
    Tag,
    Truck,
    Watch,
} from 'lucide-react';

export const heroSlides = [
    {
        id: 1,
        topText: 'SONY',
        title: 'NEW COLLECTIONS',
        subtitle: 'High-quality wireless noise-cancelling headphones.',
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8',
        buttonText: 'SHOP NOW',
        buttonLink: '/products',
    },
    {
        id: 2,
        topText: 'APPLE',
        title: 'ELECTRONIC DEVICE',
        subtitle: 'Sleek and powerful smartphone with advanced camera.',
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9',
        buttonText: 'SHOP NOW',
        buttonLink: '/products',
    },
    {
        id: 3,
        topText: 'NIKE',
        title: 'SUMMER SPECIALS',
        subtitle: 'Comfortable and stylish running shoes.',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        buttonText: 'SHOP NOW',
        buttonLink: '/products',
    },
];

export const benefits = [
    {
        icon: <ShieldCheck className="h-8 w-8 text-white" />,
        title: 'MONEY BACK',
        description: '30 Days Money Back Guarantee',
    },
    {
        icon: <Truck className="h-8 w-8 text-white" />,
        title: 'FREE SHIPPING',
        description: 'Shipping on orders over $99',
    },
    {
        icon: <Tag className="h-8 w-8 text-white" />,
        title: 'SPECIAL SALE',
        description: 'Extra $5 off on all items',
    },
];

// category constants

export const Categories: Category[] = [
    {
        id: 'tshirt',
        name: 'T-Shirt',
        icon: <Shirt className="h-8 w-8" />,
        href: '/category/tshirt',
        count: 245,
    },
    {
        id: 'jacket',
        name: 'Jacket',
        icon: <Pen className="h-8 w-8" />,
        href: '/category/jacket',
        count: 128,
    },
    {
        id: 'skirt',
        name: 'Skirt',
        icon: <Sword className="h-8 w-8" />,
        href: '/category/skirt',
        count: 89,
    },
    {
        id: 'jeans',
        name: 'Jeans',
        icon: <BookText className="h-8 w-8" />,
        href: '/category/jeans',
        count: 156,
    },
    {
        id: 'bag',
        name: 'Bag',
        icon: <Briefcase className="h-8 w-8" />,
        href: '/category/bag',
        count: 203,
    },
    {
        id: 'shoes',
        name: 'Shoes',
        icon: <BookText className="h-8 w-8" />,
        href: '/category/shoes',
        count: 312,
    },
    {
        id: 'watches',
        name: 'Watches',
        icon: <Watch className="h-8 w-8" />,
        href: '/category/watches',
        count: 67,
    },
    {
        id: 'cap',
        name: 'Cap',
        icon: <HatGlasses className="h-8 w-8" />,
        href: '/category/cap',
        count: 94,
    },
];
