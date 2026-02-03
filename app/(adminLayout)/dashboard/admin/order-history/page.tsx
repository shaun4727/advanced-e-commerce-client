import OrderHistoryAdmin from '@/components/dashboard/order-history';
import { getAllUsersApi } from '@/services/AuthService';

export default async function OrderHistoryAdminPage() {
    const res = (await getAllUsersApi()).data;
    return (
        <div>
            <OrderHistoryAdmin agents={res} />
        </div>
    );
}
