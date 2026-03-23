'use client';
import { Bot, SquareTerminal } from 'lucide-react';

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
} from '@/components/ui/sidebar';
import { useShop } from '@/context/ShopContext';
import { useUser } from '@/context/UserContext';
import { useEffect } from 'react';
import { NavUser } from './nav-user';
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
            url: '/dashboard/admin/order-history',
            icon: SquareTerminal,
            isActive: true,
            isCollapsible: false,
        },
        {
            title: 'Agent Creation',
            url: '/dashboard/admin/agent-account-creation',
            icon: SquareTerminal,
            isActive: true,
            isCollapsible: false,
        },
        {
            title: 'Nav Menu Builder',
            url: '/dashboard/nav-menu-builder',
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

const UserNavigation = {
    navMain: [
        {
            title: 'Dashboard',
            url: '/dashboard/user/dashboard',
            icon: SquareTerminal,
            isActive: true,
            isCollapsible: false,
        },
        {
            title: 'Order History',
            url: '/dashboard/user/order-history',
            icon: SquareTerminal,
            isActive: true,
            isCollapsible: false,
        },
    ],
};

const AgentNavigation = {
    navMain: [
        {
            title: 'Dashboard',
            url: '/dashboard/agent/dashboard',
            icon: SquareTerminal,
            isActive: true,
            isCollapsible: false,
        },
        {
            title: 'Orders Assigned',
            url: '/dashboard/agent/orders',
            icon: SquareTerminal,
            isActive: true,
            isCollapsible: false,
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

                {user?.role === 'user' && (
                    <NavMain items={UserNavigation.navMain} role={user?.role} />
                )}
                {user?.role === 'agent' && (
                    <NavMain
                        items={AgentNavigation.navMain}
                        role={user?.role}
                    />
                )}
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
