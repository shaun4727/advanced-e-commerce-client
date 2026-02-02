'use server';

import { getValidToken } from '@/lib/verifyToken';
import { navSubItem, TNavigationForm } from '@/types/navItems';
import { updateTag } from 'next/cache';

export const createNavigationApi = async (
    data: TNavigationForm,
): Promise<any> => {
    const token = await getValidToken();

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/navigation/create-menu`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // REQUIRED
                Authorization: token,
            },
            body: JSON.stringify(data), // Send the object directly
        },
    );
    updateTag('GET_NAVIGATION_MENU');

    return res.json();
};

export const updateNavItemApi = async (data: {
    id: string;
    navItem: navSubItem;
}): Promise<any> => {
    const token = await getValidToken();

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/navigation/update-nav-menu`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // REQUIRED
                Authorization: token,
            },
            body: JSON.stringify(data), // Send the object directly
        },
    );
    updateTag('GET_NAVIGATION_MENU');

    return res.json();
};

export const getNavigationApi = async (): Promise<any> => {
    const token = await getValidToken();

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/navigation/get-menu`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json', // REQUIRED
                Authorization: token,
            },

            next: {
                tags: ['GET_NAVIGATION_MENU'],
            },
        },
    );

    return res.json();
};

export const deleteNavigationApi = async (id: string): Promise<any> => {
    const token = await getValidToken();

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/navigation/delete-menu/${id}`,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json', // REQUIRED
                Authorization: token,
            },
        },
    );
    updateTag('GET_NAVIGATION_MENU');

    return res.json();
};
