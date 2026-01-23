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
            <main className="px-50">
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    );
}
