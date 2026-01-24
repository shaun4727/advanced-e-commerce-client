/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { cookies } from 'next/headers';

export const createShopService = async (data: FormData) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/shop`, {
            method: 'POST',
            headers: {
                Authorization: (await cookies()).get('ecommerce-accessToken')!
                    .value,
            },
            body: data,
        });

        return res.json();
    } catch (error: any) {
        return Error(error);
    }
};

export const updateShopService = async (data: FormData) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/shop`, {
            method: 'PUT',
            headers: {
                Authorization: (await cookies()).get('ecommerce-accessToken')!
                    .value,
            },
            body: data,
        });

        return res.json();
    } catch (error: any) {
        return Error(error);
    }
};

export const getShopInfoApi = async () => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/shop/my-shop`,
            {
                method: 'GET',
                headers: {
                    Authorization: (await cookies()).get(
                        'ecommerce-accessToken',
                    )!.value,
                },
            },
        );

        return res.json();
    } catch (error: any) {
        return Error(error);
    }
};
