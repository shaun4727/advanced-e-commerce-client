import AgentAccountCreation from '@/components/dashboard/agent-account-creation';
import { getAllUsersApi } from '@/services/AuthService';

export const metadata = {
    title: 'Create Agent',
    description: 'an e-commerce website',
};

export default async function getAgentAccount() {
    const res = await getAllUsersApi();

    return (
        <div>
            <AgentAccountCreation agents={res.data || []} />
        </div>
    );
}
