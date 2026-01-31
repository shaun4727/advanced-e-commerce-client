'use server';

import { getValidToken } from '@/lib/verifyToken';
import { TNavigationForm } from '@/types/navItems';
import { revalidateTag, updateTag } from 'next/cache';

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
    revalidateTag('GET_NAVIGATION_MENU', 'max');

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
