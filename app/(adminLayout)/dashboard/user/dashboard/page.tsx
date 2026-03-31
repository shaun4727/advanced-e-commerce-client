import DashboardProfile from '@/dashboard-components/user-dashboard/dashboard-profile';

export const metadata = {
    title: 'User Dashboard',
    description: 'an e-commerce website',
};

export default function UserDashboard() {
    return (
        <div>
            <DashboardProfile />
        </div>
    );
}
