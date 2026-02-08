'use client';

import { ChevronRight, type LucideIcon } from 'lucide-react';

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { shopFormData } from '@/types/shop';
import Link from 'next/link';

export function NavMain({
    items,
    role,
    shopInfo,
}: {
    items: {
        title: string;
        url: string;
        icon?: LucideIcon;
        isActive?: boolean;
        isCollapsible?: boolean;
        items?: {
            title: string;
            url: string;
        }[];
    }[];
    role?: string;
    shopInfo?: shopFormData | null;
}) {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item, index) => (
                    <div key={index}>
                        {item.isCollapsible === true && role === 'admin' && (
                            <Collapsible
                                key={item.title}
                                asChild
                                defaultOpen={item.isActive}
                                className="group/collapsible"
                            >
                                <SidebarMenuItem>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton tooltip={item.title}>
                                            {item.icon && <item.icon />}
                                            <span>{item.title}</span>
                                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            {shopInfo &&
                                                item.items?.map((subItem) => (
                                                    <SidebarMenuSubItem
                                                        key={subItem.title}
                                                    >
                                                        <SidebarMenuSubButton
                                                            asChild
                                                        >
                                                            <a
                                                                href={
                                                                    subItem.url
                                                                }
                                                            >
                                                                <span>
                                                                    {
                                                                        subItem.title
                                                                    }
                                                                </span>
                                                            </a>
                                                        </SidebarMenuSubButton>
                                                    </SidebarMenuSubItem>
                                                ))}
                                            <SidebarMenuSubItem>
                                                {!shopInfo && (
                                                    <SidebarMenuSubButton
                                                        asChild
                                                    >
                                                        <Link href="/dashboard/shop/shop-detail">
                                                            <span>
                                                                Manage Shop
                                                            </span>
                                                        </Link>
                                                    </SidebarMenuSubButton>
                                                )}
                                            </SidebarMenuSubItem>
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </SidebarMenuItem>
                            </Collapsible>
                        )}

                        {item.isCollapsible === false && role === 'user' && (
                            <SidebarMenuButton tooltip={item.title}>
                                {item.icon && <item.icon />}
                                <Link href={item.url}>
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        )}

                        {item.isCollapsible === false && role === 'agent' && (
                            <SidebarMenuButton tooltip={item.title}>
                                {item.icon && <item.icon />}
                                <Link href={item.url}>
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        )}

                        {item.isCollapsible === false && role === 'admin' && (
                            <SidebarMenuButton tooltip={item.title}>
                                {item.icon && <item.icon />}
                                <Link href={item.url}>
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        )}
                    </div>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
