'use client';
import { Bot, SquareTerminal } from 'lucide-react';

import { Sidebar, SidebarContent } from '@/components/ui/sidebar';
import { useShop } from '@/context/ShopContext';
import { useUser } from '@/context/UserContext';
import { useEffect } from 'react';
import { NavMain } from './sidebar-components/nav-main';

// Menu items.
const data = {
    navMain: [
        {
            title: 'Dashboard',
            url: '/dashboard',
            icon: SquareTerminal,
            isActive: true,
            isCollapsible: false,
        },
        {
            title: 'Order History',
            url: '/dashboard/order-history',
            icon: SquareTerminal,
            isActive: true,
            isCollapsible: false,
        },
        {
            title: 'Create Agent',
            url: '/dashboard/agent-account-creation',
            icon: SquareTerminal,
            isActive: true,
            isCollapsible: false,
        },
        {
            title: 'Shop',
            url: '/dashboard/shop/products',
            icon: Bot,
            isCollapsible: true,
            items: [
                {
                    title: 'Manage Shop',
                    url: '/dashboard/shop/shop-detail',
                },
                {
                    title: 'Manage Products',
                    url: '/dashboard/shop/products',
                },
                {
                    title: 'Manage Categories',
                    url: '/dashboard/shop/category',
                },
                {
                    title: 'Manage Brands',
                    url: '/dashboard/shop/brand',
                },
                {
                    title: 'Manage Coupon',
                    url: '/dashboard/shop/manage-coupon',
                },
            ],
        },
    ],
};

export function AppSidebar() {
    const { user, setIsLoading: userLoader } = useUser();
    const { setIsLoading: shopLoader, shopInfo } = useShop();

    useEffect(() => {
        shopLoader(true);

        userLoader(true);
    }, []);

    return (
        <Sidebar className="w-48">
            <SidebarContent>
                {user?.role === 'admin' && (
                    <NavMain
                        items={data.navMain}
                        role={user?.role}
                        shopInfo={shopInfo}
                    />
                )}
            </SidebarContent>
        </Sidebar>
    );
}
