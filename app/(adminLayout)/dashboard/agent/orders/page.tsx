export const dynamic = 'force-dynamic';
import AgentOrdersTable from '@/dashboard-components/agent-dashboard/agent-orders-table';
import { getProfileDataApi } from '@/services/AuthService';
import { getOrdersOfAgentApi } from '@/services/CartServices';

const Page = async () => {
    const resp = await getProfileDataApi();
    const user = resp.data;
    const res = await getOrdersOfAgentApi(user?._id);
    const orders = res.data;

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight">
                    Assigned Deliveries
                </h1>
                <p className="text-muted-foreground italic">
                    Logged in as: {user?.name}
                </p>
            </div>

            {/* Pass data to the Client Component Table */}
            <AgentOrdersTable initialOrders={orders} agentId={user?._id} />
        </div>
    );
};

export default Page;
