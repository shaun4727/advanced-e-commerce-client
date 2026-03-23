import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/dashboard-components/app-sidebar';

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="flex-1 min-h-screen transition-[margin-left] duration-300 ml-(--sidebar-width)">
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    );
}
