'use server';

import { getValidToken } from '@/lib/verifyToken';
import { TNavigationForm } from '@/types/navItems';

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

    return res.json();
};
