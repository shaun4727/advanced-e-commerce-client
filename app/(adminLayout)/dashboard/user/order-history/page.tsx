import OrderHistory from '@/dashboard-components/user-dashboard/order-history';

export const metadata = {
    title: 'Order History',
    description: 'an e-commerce website',
};

export default function OrderHistoryPage() {
    return (
        <div>
            <OrderHistory />
        </div>
    );
}
