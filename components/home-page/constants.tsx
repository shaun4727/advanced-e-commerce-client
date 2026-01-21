import { ShieldCheck, Tag, Truck } from 'lucide-react';

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
